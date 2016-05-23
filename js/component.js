
(function(context, nameInContext, $, undef){

	var attrPrefix = 'component';
	var placeholderPrefix = 'placeholder';
	var placeholderIdAttr = placeholderPrefix + '-found'
	var components = {};
	var renderedComponents = [];
	var placeholders = {};

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
		self.e = e;
		self.$e = $(e);
	};

	var lookupPlaceholders = function(context){
		console.log('lookupPlaceholders');
		var list = null;
		var selector = '[component]';
		if (context){
			list = $(selector, context)
		}else{
			list = $(selector)
		}
		var found = 0;
		list.each(function(){
			var el = this;
			if (!el.componentPlaceholder){
				el.componentPlaceholder = new placeholder(el);
			}
			var p = el.componentPlaceholder;
			var cid = p.$e.attr('component');
			var cida = cid.split(' ');
			var inactive = 0;
			for (var k in cida){
				var cid = cida[k];
				console.log('lookupPlaceholders cid', cid);
				if ('' !== cid){
					var status = p.components[cid];
					//console.log('lookupPlaceholders cid found?', status);
					if ('undefined' === typeof status){
						p.components[cid] = false;
						console.log('lookupPlaceholders cid found', status);
						found++;
					}
					if(false === status){
						inactive++;
					}
				}
				if (!placeholders[cid]){
					placeholders[cid] = [];
				}
				placeholders[cid].push(placeholder);
			}
			p.$e.attr('component', '');
			console.log('lookupPlaceholders', p.components, p);
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
		});
		console.log('lookupPlaceholders', found);
	};

	var replacePlaceholder = function(el, component, isInstance){
		//if ($(el).attr(attrPrefix)){
		var c;
		if (!isInstance){
			c = component.instance();
		}else{
			c = component;
		}
		//$(el).removeAttr(placeholderIdAttr);
		el.placeholderReplaced = true;
		$(el).removeAttr(attrPrefix);
		$(el).attr(component.codename + '-' + attrPrefix, c.id);
		$(el).addClass(component.codename + '-' + attrPrefix);
		$(el).attr('component-active', component.codename);
		/*if ($(el).attr('id')){
		}else{
			$(el).attr('id', c.id);
		}*/
		c.e = el;
		c.$e = $(el);
		renderedComponents.push(c);
		console.log('render', c.codename, c.id);
		!c.render || c.render();
		c.bindScope();
		!c.service || c.service();

		//c.bindModels();
		///}
		return c; // return instance
	}
	var resize = function(domElement){
		console.log('component.resize');
		var c = this;

	};
	var update = function(domElement){
		console.log('component.update');
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
				while (el = placeholders[cid].pop()){
					replacePlaceholder(el, component);
					lookupPlaceholders(el); // lookup newly rendered placeholders
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
			if (TYPE_FUNCTION !== typeof render){
				// object
				$.extend(self, render);
				console.log(self.codename, render, self);
				render = null;
			}
			self.appendTo = function(tagName, target){
				var self = this;
				target = $(target);
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.appendTo(target);
				console.log('appendTo', $e.get(0), target.get(0));
				return self.replace($e.get(0)); // return instance
			};
			self.replace = function(e){
				var self = this;
				return replacePlaceholder(e, self); // return instance
				//return self;
			};
			self.render = self.render || render; // check if was extended with object
			self.service = self.service || service; // check if was extended with object
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
					parent: null,
					e: null
				});

				return inst;
			};
			//$(function(){
				// wait for <body>
				!self.extend || self.extend(); // run class extend() if exists
			//});

			update();
		//});
		components[codename] = self;
	};
	$(function(){
		update();
	});
	component.get = function(id){
		return components[id];
	};
	component.componentInstance = componentInstance;
	component.replace = replacePlaceholder;
	component.list = components;
	component.rendered = renderedComponents;
	component.update = update;
	component.lookup = lookupPlaceholders;
	context[nameInContext] = component;
	component.v = boundVariable;
	component.bind = bindVariable;
	// component.lookup();

})(this, 'component', jQuery);
