var loadedComponents = {}; // key is component name
var loadedInstances = {}; // key is uuid
var isLoaded = function(id){
	return 'undefined' !== typeof loadedComponents[id];
}
var requireId = function(id, callback){
	if (isLoaded(id)){
		return callback(loadedComponents[id]);
	}
	// FIXME load component
	component.loadComponent(id, callback);
}
var requireAll = function(components, callback){
	if (0 === components.length){
		return callback.apply(this, []);
	}
	var onLoad = function(callback){
		var list = [];
		for (var k in components){
			var id = components[k];
			if (!isLoaded(id)){
				return false;
			}
			list.push(loadedComponents[id]);
		}
		return callback(list);
	}
	for (var k in components){
		var id = components[k];
		requireId(id, function(){
			onLoad(function(list){
				callback.apply(this, list);
			});
		});
	}
}
var uuid = (function(){
	var base = (function(){
		return {
			//b2: '01',
			//b8: '01234567',
			//b10: '0123456789',
			b16: '0123456789abcdef',
			//b32: '0123456789abcdefghijklmnopqrstuvwxyz',
			//b58bitcoin: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			b60ola: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz',
			//b58ripple: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz',
			//b58flickr: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
			//b62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			encode: function(src, srctable){
				return this.convert(src, srctable, this.b60ola);
			},
			decode: function(dest, srctable){
				return this.convert(dest, this.b60ola, desttable);
			},
			encodeHex: function(src){
				return this.encode(src, this.b16);
			},
			decodeHex: function(dest){
				return this.decode(dest, this.b16);
			},
			convert: function(src, srctable, desttable){
				var srclen = srctable.length;
				var destlen = desttable.length;
				var val = 0;
				var numlen = src.length;
				for(var i = 0; i < numlen; i++){
					val = val*srclen + srctable.indexOf(src.charAt(i));
				}
				if (val<0){
					return 0;
				}
				var r = val % destlen;
				var dest = desttable.charAt(r);
				var q = Math.floor(val / destlen);
				while (q){
					r = q % destlen;
					q = Math.floor(q / destlen);
					dest = desttable.charAt(r) + dest;
				}
				return dest;
			}
		};
	})();
	return {
		v4: function(){
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0,
				v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
		v4n: function(){
			return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0,
				v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
		v4s: function(){
			return base.convert(this.v4n(), base.b16, base.b60ola);
		}
	};
})();

var component = (function(name){
	var extend = function(){
		var parent = null;
		var id = null, guid = uuid.v4s(), depsId = [], deps = [], factory = null, extendWith = [], copyParentProperties = true;
		// Parse arguments:
		for (var k in arguments){ // arguments of extend()
			var arg = arguments[k];
			if (0 == k){
				parent = arg;
			}else{
				if (true === arg || false === arg){
					//console.log('bool');
					copyParentProperties = arg;
				}else if (typeof '' === typeof arg){
					if ('' != arg && Object.defineProperty){
						id = arg;
					}
				}else if (typeof function(){} === typeof arg){
					factory = arg;//.apply(instance, []); // factory
				}else if (typeof {} === typeof arg){
					if (arg instanceof [].constructor){
						depsId = arg;
					}else{
						extendWith.push(arg);
						//for (var j in arg){
						//	instance[j] = arg[j];
						//}
					}
				}
			}
		}
		if (copyParentProperties && parent){
			extendWith.unshift(parent);
		}
		// Create constructor
		var instance = (function(extend, id, parent, copyParentProperties, extendWith, depsId, factory){
			//console.info('Creating constructor for', id);
			var constructor = function(){
				var parent = constructor;
				var self = this;
				var a = [];
				a.push(parent); // extend with parent
				//a.push(constructor); // extend with self
				for (var k in arguments){ // arguments of new component()
					a.push(arguments[k]);
				}
				return extend.apply(parent, a);
			};
			var recursiveFactory = function(){
				var instance = this;
				//console.log('recursiveFactory', factory, extendWith);
				requireAll(depsId, function(){
					for (var i in extendWith){
						var obj = extendWith[i];
						for (var j in obj){
							instance[j] = obj[j];
						}
					}
					if (copyParentProperties && parent && parent.prototype.factory){
						//console.log('recursiveFactory parent', parent.prototype.factory);
						parent.prototype.factory.apply(instance, arguments);
					}
					if (null != factory){
						factory.apply(instance, arguments);
					}
				});
			};
			/*if (null != factory){
				console.log(id, 'factory()');
				requireAll(depsId, function(){
					factory.apply(constructor, arguments);
				});
			}*/
			constructor.prototype.factory = recursiveFactory;
			recursiveFactory.apply(constructor, []);
			//console.dir(constructor);
			return constructor;
		})(extend, id, parent, copyParentProperties, extendWith, depsId, factory);


		// extend class with
		/*for (var i in extendWith){
			var obj = extendWith[i];
			for (var j in obj){
				instance[j] = obj[j];
			}
		}*/

		if (null !== id){
			instance.componentName = id;
			loadedComponents[id] = instance;
			if (Object.defineProperty){
				Object.defineProperty(instance, 'name', { // ie9+
					enumerable: false,
					configurable: false,
					writable: false,
					value: id
				});
			}
		}
		instance.id = uuid.v4s();
		loadedInstances[instance.id] = instance;
		return instance;
	}
	return new extend(function(){}, name, function(){}, {
		require: function(idList, callback){
			return requireAll(idList, function(){
				callback.apply(this, arguments);
			});
		},
		isLoaded: function(id){
			return isLoaded(id);
		},
		setComponent: function(id, component){
			loadedComponents[id] = component; // the only way to change loadedComponents from outside
		},
		loadComponent: function(id, callback){
			console.error('Component', id, 'was not loaded');
		}
	});
})('component');