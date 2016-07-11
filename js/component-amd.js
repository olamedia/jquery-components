var component = (function(name){
	var loadedComponents = {};
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
	var extend = function(){
		var instance = (function(extend){
			var component = function(){
				var a = [];
				a.push(component); // extend with self
				for (var k in arguments){
					a.push(arguments[k]);
				}
				return extend.apply(this, a);
			};
			return component;
		})(extend);
		var id = null, depsId = [], deps = [], factory = null, parent = null, copyParentProperties = false;
		for (var k in arguments){
			var arg = arguments[k];
			if (0 == k){
				parent = arg;
			}else{
				if (true === arg || false === arg){
					console.log('bool');
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
						for (var j in arg){
							instance[j] = arg[j];
						}
					}
				}
			}
		}
		if ((copyParentProperties && parent)){
			console.log('copy parent', parent.id);
			for (var j in parent){
				console.log(j);
				instance[j] = parent[j];
			}
		}
		if (null != factory){
			requireAll(depsId, function(){
				factory.apply(instance, arguments);
			});
		}
		if (null !== id){
			instance.id = id;
			loadedComponents[id] = instance;
			Object.defineProperty(instance, 'name', { // ie9+
				enumerable: false,
				configurable: false,
				writable: false,
				value: id
			});
		}
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
