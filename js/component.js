
(function(context, nameInContext, $, undef){

	var attrPrefix = 'component';
	var placeholderPrefix = 'placeholder';
	var placeholderIdAttr = placeholderPrefix + '-found'
	var components = {};
	var renderedComponents = [];
	var placeholders = {};

	var eventListeners = {};
	var componentEvent = function(eventname){
		var self = this;
		self.name = eventname;
	}

	var removeEventListener = function(el, eventName, handler) {
		if (el.removeEventListener){
			el.removeEventListener(eventName, handler);
		}else{
			el.detachEvent('on' + eventName, handler);
		}
	}
	var addEventListener = function(el, eventName, handler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		}else{
			el.attachEvent('on' + eventName, function(){
				handler.call(el);
			});
		}
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
		console.info('global event', eventname);
		for (var k in eventListeners[eventname]){
			var l = eventListeners[eventname][k];
			var e = new componentEvent(eventname);
			e.target = l.target;
			l(e);
		}
	}

	var uuid = (function(){
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

	var placeholder = function(e){
		var self = this;
		self.components = {};
		self.active = [];
		self.e = e;
		self.$e = $(e);
		self.activate = function(cid){
			self.components[cid] = true;
			self.active.push(cid);
			self.$e.attr('component-active', self.active.join(' '));
		}
	};
	var getPlaceholder = function(e){
		if ('undefined' === typeof e.componentPlaceholder){
			e.componentPlaceholder = new placeholder(e);
		}
		var p = e.componentPlaceholder;
		return p;
	};
	var lookupPlaceholders = function(context){
		//console.log('lookupPlaceholders');
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
			var p = getPlaceholder(el);
			var cid = p.$e.attr('component');
			var cida = cid.split(' ');
			var inactive = 0;
			for (var k in cida){
				var cid = cida[k];
				if (!placeholders[cid]){
					placeholders[cid] = [];
				}
				//console.log('lookupPlaceholders cid', cid);
				if ('' !== cid){
					var status = p.components[cid];
					//console.log('lookupPlaceholders cid found?', status);
					if ('undefined' === typeof status){
						p.components[cid] = false;
						foundComponents.push(cid);
						placeholders[cid].push(el);
						//console.log('lookupPlaceholders cid found', status);
						found++;
					}
					if(false === status){
						inactive++;
					}
				}
			}
			p.$e.attr('component', '');
			p.e.removeAttribute('component');
			//console.log('lookupPlaceholders', p.components, p);
			/*if (el.placeholderFound){
				return;
			}*/
			//var id = uuid.v4s();
			//$el.attr(placeholderIdAttr, id);
			/*if (!placeholders[cid]){
				placeholders[cid] = [];
			}
			found++;
			el.placeholderFound = true;*/
			//placeholders[cid].push(el);
			//console.log('lookupPlaceholders', p);
		});
		//console.log('lookupPlaceholders', found, foundComponents, placeholders);
	};
	var replacePlaceholderInstance = function(p, component, isInstance){
		/*if (!el.componentPlaceholder){
			el.componentPlaceholder = new placeholder(el);
		}
		var p = el.componentPlaceholder;*/
		//return replacePlaceholder(p.e, component, isInstance);
		var el = p.e;
		//console.log('replacePlaceholderInstance', el, p, component.codename);
		if ('undefined' !== typeof p.components[component.codename] && true === p.components[component.codename]){
			return; // already activated the same component
		}
		p.activate(component.codename); // mark active
		p.$e.addClass(component.codename + '-component');


		var c;
		if (!isInstance){
			c = component.instance();
		}else{
			c = component;
		}
		p.e.component = c;
		//$(el).removeAttr(placeholderIdAttr);
		//el.placeholderReplaced = true;
		p.$e.attr(component.codename + '-component', c.id);
		//$(el).removeAttr('component');

		c.e = p.e;
		c.$e = p.$e;
		renderedComponents.push(c);
		//console.log('render', c.codename, c.id);
		!c.render || c.render();
		c.bindScope();
		!c.service || c.service();

		//c.bindModels();
		///}
		return c; // return instance
	}
	var replacePlaceholderElement = function(el, component, isInstance){
		var p = getPlaceholder(el);
		//console.log('replacePlaceholderElement', el, p, component.codename);
		return replacePlaceholderInstance(p, component, isInstance);
		//if ($(el).attr(attrPrefix)){

	}
	var resize = function(domElement){
		console.log('component.resize');
		var c = this;

	};
	var update = function(domElement){
		//console.log('component.update');
		var c = this;
		if (c){
			//console.log(c);
//			c.bindScope();
		}
		var found = 0;
		var founda = [];
		lookupPlaceholders(domElement);
		for (var cid in placeholders){
			if (components[cid]){
				var component = components[cid];
				var el = null;
				while (e = placeholders[cid].pop()){
					replacePlaceholderElement(e, component);
					lookupPlaceholders(e); // lookup newly rendered placeholders
					found++;
					founda.push(cid);
				}
			}
		}
		if (found){
			console.log('update found', found, founda);
			update();
		}
	}

	var boundVariable = function(e){
		var self = this;
		self.change = null;
		var value = null; // private
		self.bind = function(e){
			self.e = e;
			if (null === value){
				self.updateLocal();
			}else{
				self.updateDom();
			}
		};
		self.updateLocal = function(){
			value = self.get();
		};
		self.updateDom = function(){
			if (self.e){
				if (hasVal){
					self.e.val(value);
				}
				self.e.text(value);
			}
		};
		//self.e = $('');
		self.set = function(val){
			value = '' + val;
			self.updateDom();
		}
		self.get = function(){
			if (hasVal){
				return self.e.val();
			}
			return self.e.text();
		}
		if (typeof '' == typeof e){
			e = $('<'+e+'></'+e+'>');
		}
		e = e || $('<value></value>');
		self.bind(e);
		var tagName = $(e).get(0).tagName.toLowerCase();
		var isEditable = (function(){
			return 'input' == tagName || 'textarea' == tagName;
		})();
		var hasVal = (function(){
			return 'input' == tagName || 'textarea' == tagName;
		})();
		if (isEditable){
			$(e).on('change keyup paste', function(){
				self.updateLocal();
				if (self.change){
					self.change();
				}
			});
		}

	};

	var bindVariable = function(el){
		var v = new boundVariable(el);
		return v;
	}



	var TYPE_FUNCTION = typeof function(){};

	var componentInstance = function(codename){
		var self = component(codename);
		var inst = $.extend({}, self, {
			id: uuid.v4s(),
			//id: null,
			scope: {},
			scopeVar: {},
			locals: {},
			parent: null,
			e: null
		});
		return inst;
	}
	var component = function(codename, render, service){
		var self = this;
		if (!render){
			return component.get(codename);
		}
		self.codename = codename;
		//$(function(){
			// initialize components only after dom ready
			var wasExtended = false;
			if (TYPE_FUNCTION !== typeof render){
				// object
				wasExtended = true;
				$.extend(self, render);
				//console.log(self.codename, render, self);
				render = null;
			}
			self.appendTo = function(tagName, target){
				var self = this;
				target = $(target);
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.appendTo(target);
				self.$e = $e;
				self.e = $e.get(0);
				console.log('appendTo', $e.get(0), target.get(0));
				return self.replace($e.get(0)); // return instance
			};
			self.prependTo = function(tagName, target){
				var self = this;
				target = $(target);
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.prependTo(target);
				self.$e = $e;
				self.e = $e.get(0);
				console.log('prependTo', $e.get(0), target.get(0));
				return self.replace($e.get(0)); // return instance
			};
			self.replace = function(e){
				var self = this;
				return replacePlaceholderElement(e, self); // return instance
				//return self;
			};
			self.render = wasExtended ? self.render : render; // check if was extended with object
			self.service = wasExtended ? self.service : service; // check if was extended with object
			self.update = update; // update
			self.sync = function(){
				var self = this;
				for (var k in self.scopeVar){
					self.scopeVar[k].set(self.scope[k]);
				}
			};
			self.update.bind(self);
			self.bind = bindVariable;
			self.bindScope = function(cb){
				var self = this;
				$('[model]', self.e).each(function(){
					var me = this;
					var $me = $(me);

					var model = $me.attr('model').split('.');
					$me.removeAttr('model');

					var value = self.scope[model] || null;

					var v = self.bind($me);
					v.set(value);

					self.scopeVar[model] = v;

				});
			}
			self.instance = function(){
				var self = this;
				var inst = $.extend({}, self, {
					id: uuid.v4s(),
					//id: null,
					scope: {},
					scopeVar: {},
					locals: {},
					//parent: null,
					e: null
				});
				//!inst.resize || inst.on('resize', inst.resize);
				return inst;
			};
			self.createElement = function(tag){
				return document.createElement(tag);
			};
			self.on = function(eventname, callback){
				var self = this;
				callback.target = self;
				addListener(eventname, callback);
			}
			self.parent = function(){
				var self = this;
				if (!self.$e){
					console.log('no element');
					return null;
				}
				var parent = self.$e.parents('[component-active]');
				console.log('parent element', parent, parent.length ? parent.get(0).component : null);
				return parent.length ? parent.get(0).component : null;
			}

			// FIXME move to instance  !self.resize || self.on('resize', self.resize);
			//$(function(){
				// wait for <body>
				!self.extend || self.extend(); // run class extend() if exists
			//});

			update();
		//});
		components[codename] = self;
	};
	component.get = function(id){
		return components[id];
	};
	var queryComponent = function(selector){
		var $e = $(selector);
		if ($e.length){
			var e = $e.get(0);
			if (e.component){
				return e.component; // direct match
			}
		}
		return null;
	};
	component.query = queryComponent;
	component.trigger = triggerGlobal;
	component.componentInstance = componentInstance;
	component.replace = replacePlaceholderElement;
	component.list = components;
	component.rendered = renderedComponents;
	component.update = update;
	component.lookup = lookupPlaceholders;
	context[nameInContext] = component;
	component.v = boundVariable;
	component.bind = bindVariable;
	// component.lookup();
	$(function(){
		update();
		$(window).on('resize', function(){
			component.trigger('resize');
		});
	});

})(this, 'component', jQuery);
