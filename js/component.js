;(function( window ){
;(function(context, nameInContext, jQuery){
	var $ = jQuery;//.noConflict();
	// +++++++++++++++++++++++++++++ EVENTS ++++++++++++++++++++++++++++++++++
/*
	if (!('querySelectorAll' in document)){
		return;
	}
	
	var query = function(selector){
		return document.querySelectorAll(selector);
	}
*/
	var eventListeners = {};
	var componentEvent = function(eventname){
		var self = this;
		self.name = eventname;
	}
	var addListener = function(eventname, listener){
		if ('undefined' === typeof eventListeners[eventname]){
			eventListeners[eventname] = [];
		}
		eventListeners[eventname].push(listener);
	}
	var removeListener = function(eventname, listener){
		if ('undefined' === typeof eventListeners[eventname]){
			return;
		}
		for (var k in eventListeners[eventname]){
			if (listener === eventListeners[eventname][k]){
				eventListeners[eventname].splice(k, 1);
			}
		}
	}
	var triggerGlobal = function(eventname){
		//console.info('global event', eventname);
		for (var k in eventListeners[eventname]){
			var l = eventListeners[eventname][k];
			var e = new componentEvent(eventname);
			e.target = l.target;
			l(e);
		}
	}
	// ----------------------------- EVENTS ----------------------------------


	var loadedComponents = {}; // key is component name
	var loadedInstances = {}; // key is uuid
	var isLoaded = function(id){
		//xonsole.log('isLoaded', id, 'undefined' !== typeof loadedComponents[id]);
		return 'undefined' !== typeof loadedComponents[id];
	}
	var onLoadListeners = {};
	var requireId = function(componentName, callback){
		if (isLoaded(componentName)){
			return onComponentLoad(componentName);//callback(loadedComponents[id]);
		}
		// FIXME load component
		component.loadComponent(componentName);
	}
	var onComponentLoad = function(componentName){
		//xonsole.log('onComponentLoad', componentName);

		var foundComponent = loadedComponents[componentName];

		var path = component.baseUrl + "/" + componentName;
		//var src = path + '/' + id + '.js'; // npm-like naming
		var css = path + '/' + componentName + '.css';

		var onLoad = function(){
			if ('undefined' != typeof onLoadListeners[componentName]){
				var listeners = onLoadListeners[componentName];
				//console.info('onComponentLoad', componentName, 'listeners', listeners);
				for (var k in listeners){
					var listener = listeners[k];
					listener();
				}
				delete onLoadListeners[componentName];
			}
		}
		if (true === foundComponent.includeCss){
			component.loadCss(css, function(){
				onLoad();
			});
		}else{
			onLoad();
		}
		//var self = this;
		//var componentName = self.componentName;
	}
	var requireAll = function(components, callback){
		if (0 === components.length){
			return callback.apply(this, []);
		}
		//xonsole.log('requireAll', components);
		var onLoadAll = (function(components, callback){
			var executed = false;
			return function(){
				//xonsole.log('onLoad', components, callback);
				var list = [];
				var complete = true;
				for (var k = 0; k<components.length; k++){
					var componentName = components[k];
					if (!isLoaded(componentName)){
						//xonsole.log(componentName, 'is not loaded yet');
						complete = false;
					}else{
						//xonsole.trace(componentName, 'is loaded');
						var component = loadedComponents[componentName];
						if (component.readyMethod){
							list.push(component.readyMethod());
						}else{
							list.push(component);
						}
					}
				}
				if (!complete){
					return false;
				}
				if (!executed){ // execute once only
					executed = true;
					return callback.apply(this, list);
				}
			}
		})(components, callback);

		for (var k = 0; k<components.length; k++){
			var componentName = components[k];
			//if (!isLoaded(componentName)){
				if ('undefined' == typeof onLoadListeners[componentName]){
					onLoadListeners[componentName] = [];
				}
				onLoadListeners[componentName].push(function(){
					onLoadAll(function(list){
						callback.apply(this, list);
					});
				}); // defer onload
			//}
		}

		/*for (var k in components){
			var id = components[k];
			if ('undefined' == typeof onLoadListeners[id]){
				onLoadListeners[id] = [];
			}
			onLoadListeners[id].push(function(){
				onLoad(function(list){
					callback.apply(this, list);
				});
			});
		}*/
		for (var k = 0; k<components.length; k++){
			var componentName = components[k];
			requireId(componentName);
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
			//xonsole.log('extend pasre args');
			for (var k = 0; k<arguments.length; k++){ // arguments of extend()
				var arg = arguments[k];
				//xonsole.log('extend pasre arg ' + arg);
				if (0 == k){
					parent = arg;
					//xonsole.log('extend pasre arg = parent');
				}else{
					if (true === arg || false === arg){
						//xonsole.log('bool');
						copyParentProperties = arg;
						//xonsole.log('extend pasre arg = boolean');
					}else if (typeof '' === typeof arg){
						//xonsole.log('extend parse String ', arg);
						if ('' != arg){// && Object.defineProperty
							id = arg;
						}
					}else if (typeof function(){} === typeof arg){
						//xonsole.log('extend pasre arg = Function');
						factory = arg;//.apply(instance, []); // factory
					}else if (typeof {} === typeof arg){
						//xonsole.log('extend pasre arg = Object');
						if (arg instanceof [].constructor){
							//xonsole.log('extend pasre arg = Array');
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
			var instance = (function(extend, iid, parent, copyParentProperties, extendWith, depsId, factory){
				//console.info('Creating constructor for', iid);
				var constructor = function(){
					var parent = constructor;
					var self = this;
					var a = [];
					a.push(parent); // extend with parent
					//a.push(constructor); // extend with self
					for (var k = 0; k<arguments.length; k++){ // arguments of new component()
						a.push(arguments[k]);
					}
					return extend.apply(parent, a);
				};
				var recursiveFactory = function(){
					var instance = this;
					//xonsole.log('recursiveFactory', factory, extendWith);
					requireAll(depsId, function(){
						//for (var i = 0; i<extendWith.length; i++){
						for (var i in extendWith){
							var obj = extendWith[i];
							//for (var j = 0; j<extendWith.length; j++){
							for (var j in obj){
								var value = obj[j];
								if (typeof function(){} === typeof value){
									instance[j] = obj[j];
									if (instance[j].bind){
										instance[j].bind(instance);
									}
								}else{

									instance[j] = obj[j];
								}
							}
						}
						if (copyParentProperties && parent && parent.prototype.factory){
							//xonsole.log('recursiveFactory parent', parent.prototype.factory);
							parent.prototype.factory.apply(instance, arguments);
						}
						if (null != factory){
							factory.apply(instance, arguments);
						}
					});
				};
				/*if (null != factory){
					xonsole.log(id, 'factory()');
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
			//xonsole.log('set component name?', id);
			if (null !== id){
				//xonsole.log('set component name', id);
				instance.componentName = id;
				//loadedComponents[id] = instance;
				if (Object.defineProperty){
					try{
						Object.defineProperty(instance, 'name', { // ie9+
							enumerable: false,
							configurable: false,
							writable: false,
							value: id
						});
					}catch(ex){
						// opera does not allow modifying name
					}
				}
			}
			instance.id = uuid.v4s();
			loadedInstances[instance.id] = instance;
			return instance;
		}
		return new extend(function(){}, name, function(){
			var self = this;
			self.eventListeners = {};
			self.on = function(eventname, callback){
				var self = this;
				callback.target = self;
				addListener(eventname, callback); // listen global events
				if ('undefined' === typeof self.eventListeners[eventname]){
					self.eventListeners[eventname] = [];
				}
				self.eventListeners[eventname].push(callback);
			}
			self.trigger = function(eventname, data){
				//console.info('Trigger ' + eventname + '');
				var self = this;
				for (var k in self.eventListeners[eventname]){
					var listener = self.eventListeners[eventname][k];
					var evt = new componentEvent(eventname);
					evt.target = self;
					evt.data = data;
					listener(evt);
				}
			};

		}, {
			ready: function(){
				var self = this;
				// component is created in configured, call onload callbacks
				//xonsole.log('unnamed component ', 'READY', this);
				if ('undefined' != typeof self.componentName){
					//xonsole.log(self.componentName, 'READY');
					loadedComponents[self.componentName] = self;
					onComponentLoad(self.componentName);
				}
			},
			require: function(idList, callback){
				var self = this;
				//console.log('component.require', idList, callback);
				return (function(callback){
					return requireAll(idList, function(){
						//console.log('component.require OK', idList, self, callback);
						callback.apply(self, arguments);
					});
				})(callback);
			},
			isLoaded: function(id){
				return isLoaded(id);
			},
			setComponent: function(id, component){
				loadedComponents[id] = component; // the only way to change loadedComponents from outside
			},
			loadComponent: function(id){
				console.error('Component', id, 'was not loaded');
			}
		});
	})('component');



	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOADER
	var loadCallbacks = {};
	var loading = {};
	component.loadCss = function(src, callback){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = src;
		//xonsole.log('loadCss ' + src);
		link.onload = function(){
			//xonsole.log('loadCss ' + src + ' finished');
			if (callback){
				callback();
			}
		};
		var head = document.getElementsByTagName('head')[0];//.getElementsByTagName[0];
		head.appendChild(link);
	}
	var useMinified = false;
	var loadScript = function(id, callback){
		// load once, execute all callbacks
		//xonsole.log('loadScript', id);
		if ('undefined' === typeof loadCallbacks[id]){
			loadCallbacks[id] = [];
		}
		loadCallbacks[id].push(callback);
		if ('undefined' !== typeof loading[id]){
			return;
		}
		//xonsole.log('loadScript - ', id);
		loading[id] = true;
		//var src = id + '.js';
		var path = component.baseUrl + "/" + id;
		var src = path + '/' + id + (useMinified?'.min':'') + '.js'; // npm-like naming
		var css = path + '/' + id + '.css';
		
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.onload = function(){
			//xonsole.log('loadScript - loaded ', id);
		};
			/*script.onload = function(){
				//xonsole.log('loadScript onload', id, callback);
				if (isLoaded(id)){
					var component = loadedComponents[id];
					if (true === component.includeCss){
						loadCss(css);
					}
				}
				for (var k in loadCallbacks[id]){
					var callback = loadCallbacks[id][k];
					callback();
				}
			}*/
		script.src = src;
		head.appendChild(script);
			//xonsole.log('loadScript', id, head);
	}
	var loadedScripts = {};
	var loadedScriptsCallbacks = {};
	var loadingScripts = {};
	var requireScript = function(path, callback){
		var src = component.baseUrl + "/" + path;
		if ('undefined' !== typeof loadedScripts[src] && true === loadedScripts[src]){
			return;
		}
		if ('undefined' === typeof loadedScriptsCallbacks[src]){
			loadedScriptsCallbacks[src] = [];
		}
		loadedScriptsCallbacks[src].push(callback);
		if ('undefined' !== typeof loadingScripts[src]){
			return;
		}
		loadingScripts[src] = true;
		//xonsole.log('require script', src);
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.onload = function(){
			loadedScripts[src] = true;
			for (var k in loadedScriptsCallbacks[src]){
				var cb = loadedScriptsCallbacks[src][k];
				cb();
			}
		};
		script.src = src;
		head.appendChild(script);
	}
	component.baseUrl = '/js/jquery-components/components';
	component.loadComponent = function(componentName){
		loadScript(componentName, function(){
			/*onComponentLoad(id);
			callback();*/
		});
	}
	component.requireScript = function(path, callback){
		requireScript(path, callback);
	};

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DOM

	//component.require(['jquery'], function(jquery){
	//	var $ = jquery.jQuery;
		var placeholders = {};
		var placeholder = function(e){
			var self = this;
			self.components = {};
			self.active = [];
			self.e = e;
			self.$e = $(e);
			self.replace = function(component, instance, options){
				var el = self.e;
				var componentName = component.componentName;
				if ('undefined' !== typeof self.components[componentName] && true === self.components[componentName]){
					return; // already activated the same component
				}
				// activate ++
				self.components[componentName] = true;
				self.active.push(componentName);
				self.$e.attr('component-active', self.active.join(' '));
				// activate --
				self.$e.addClass(componentName + '-component');
				instance.options = options;
				self.e.componentInstance = instance;
				self.$e.attr(componentName + '-component', instance.id);
				instance.e = self.e;
				instance.$e = self.$e;
				//renderedComponents.push(c);
				instance.init();
				return instance; // return instance
			}
		};

		var getPlaceholder = function(e){
			if ('undefined' === typeof e.componentPlaceholder){
				e.componentPlaceholder = new placeholder(e);
			}
			var p = e.componentPlaceholder;
			return p;
		};

		component.lookup = function(context){
			var localPlaceholders = [];
			//xonsole.log('lookupPlaceholders', context);
			var list = null;
			var selector = '[component]';
			if (context){
				list = $(selector, context)
			}else{
				list = $(selector)
			}
			var found = 0;
			var foundComponents = [];
			list.each(function(){
				var el = this;
				var placeholder = getPlaceholder(el);
				//xonsole.log('found', el, placeholder);
				var cid = placeholder.$e.attr('component');
				//xonsole.log('cid ' + cid);
				if (!cid){
					return;
				}
				var cida = cid.split(' ');
				var inactive = 0;
				for (var k in cida){
					var componentName = cida[k];
					if (!placeholders[componentName]){
						placeholders[componentName] = [];
					}
					if (!localPlaceholders[componentName]){
						localPlaceholders[componentName] = [];
					}
					if ('' !== componentName){
						var status = placeholder.components[componentName];
						if ('undefined' === typeof status){
							placeholder.components[componentName] = false;
							foundComponents.push(componentName);
							placeholders[componentName].push(placeholder); // (el)
							localPlaceholders[componentName].push(placeholder);
							found++;
						}
						if(false === status){
							inactive++;
						}
					}
				}
				placeholder.$e.attr('component', '');
				placeholder.e.removeAttribute('component');
			});
			return localPlaceholders;
		};


		component.appendTo = function(tagName, target, options){ // query required
			target = $(target);
			var e = document.createElement(tagName);
			var $e = $(e);
			$e.appendTo(target);
			return this.replace(e, options); // return instance
		};
		component.prependTo = function(tagName, target, options){
			target = $(target);
			var e = document.createElement(tagName);
			var $e = $(e);
			$e.prependTo(target);
			return this.replace(e, options); // return instance
		};
		component.replace = function(domElement, options){ // replace domElement placeholder content with component instance content
			var self = this;
			return getPlaceholder(domElement).replace(self, new self(), options); // return new instance
		};
		component.instance = function(options){
			var self = this;
			var domElement = document.createElement('div');
			return self.replace(domElement, options);
		};
		component.update = function(domElement, callback){
			//xonsole.log('component.update', domElement);
			var self = this;
			var found = 0;
			var founda = [];
			var localPlaceholders = component.lookup(domElement);

			//xonsole.log(placeholders);
			for (var componentName in localPlaceholders){
				(function(componentName, localPlaceholders){
					var waiting = true;
					//xonsole.log('DOM is waiting for ', componentName, '...');
					setTimeout(function(){
						if (waiting){
							console.error('DOM was not able to load ' + componentName + ' in 10 seconds');
						}
					}, 10000);
					component.require([componentName], function domLoader(foundComponent){
						//xonsole.log('DOM loaded ', componentName, '');
						if (isLoaded(componentName)){
							waiting = false;
							//console.info(componentName, 'loaded at component.update');
							var foundComponent = loadedComponents[componentName];
							//var el = null;
							var placeholder;
							while (placeholder = localPlaceholders[componentName].pop()){
								var instance = new foundComponent();
								placeholder.replace(foundComponent, instance, true);
								//replacePlaceholderInstance(placeholder, instance, true);
								component.lookup(placeholder.e); // lookup newly rendered placeholders
								found++;
								founda.push(componentName);
							}
						}
					});
				})(componentName, localPlaceholders);
			}
			/*if (found){
				xonsole.log('update found', found, founda);
				self.update();
			}*/
		};

		component.init = function(){
			var self = this;
			!self.render || self.render();
			!self.bindScope || self.bindScope();
			!self.service || self.service();
		}

		$(function(){
			component.update();
			$(window).on('resize', function(){
				triggerGlobal('resize');
				//component.trigger('resize');
			});
		});


		component.query = function(selector){
			var $e = $(selector);
			if ($e.length){
				var e = $e.get(0);
				if (e.componentInstance){
					return e.componentInstance; // direct match
				}
			}
			return null;
		};

	//});


	context[nameInContext] = component;
	
	var jqueryComponent = new component('jquery', {
		'readyMethod': function(){
			//xonsole.log('jqueryComponent script loaded');
			return $;
		}
	});
	if (!jqueryComponent.ready){
		console.log(jqueryComponent.ready);
		console.log(jqueryComponent);
		//console.dir(jqueryComponent);
	}
	jqueryComponent.ready();
	
})(this, 'component', jQuery);

})(window); 
