
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
			b2: '01',
			b8: '01234567',
			b10: '0123456789',
			b16: '0123456789abcdef',
			b32: '0123456789abcdefghijklmnopqrstuvwxyz',
			b58bitcoin: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			b60ola: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz',
			b58ripple: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz',
			b58flickr: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
			b62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
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

	var lookupPlaceholders = function(context){
		var list = null;
		var selector = '['+attrPrefix+']';
		if (context){
			list = $(selector, context)
		}else{
			list = $(selector)
		}
		list.each(function(){
			var el = this;
			var $el = $(el);
			var cid = $el.attr(attrPrefix);
			var id = $el.attr(placeholderIdAttr);
			if (id){
				return;
			}
			var id = uuid.v4s();
			$el.attr(placeholderIdAttr, id);
			if (!placeholders[cid]){
				placeholders[cid] = [];
			}
			placeholders[cid].push(el);
		});
	};

	var replacePlaceholder = function(el, component){
		//if ($(el).attr(attrPrefix)){
		var c = component.instance();
		$(el).removeAttr(placeholderIdAttr);
		$(el).removeAttr(attrPrefix);
		c.e = el;
		c.$e = $(el);
		renderedComponents.push(c);
		!c.render || c.render();
		c.bindScope();
		!c.service || c.service();
		//c.bindModels();
		///}
	}
	var update = function(domElement){
		var c = this;
		if (c){
			//console.log(c);
//			c.bindScope();
		}
		var found = false;
		lookupPlaceholders(domElement);
		for (var cid in placeholders){
			if (components[cid]){
				var component = components[cid];
				var el = null;
				while (el = placeholders[cid].pop()){
					replacePlaceholder(el, component);
					lookupPlaceholders(el); // lookup newly rendered placeholders
					found = true;
				}
			}
		}
		if (found){
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





	var component = function(codename, render, service){
		if (!render){
			return component.get(codename);
		}
		var self = this;
		self.appendTo = function(tagName, target){
			var self = this;
			var $e = $('<'+tagName+'></'+tagName+'>');
			target.append($e);
			self.replace($e);
			return self;
		};
		self.replace = function(e){
			var self = this;
			replacePlaceholder(e, self);
			return self;
		};
		self.render = render;
		self.service = service;
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
			return $.extend({}, self, {
				id: uuid.v4s(),
				//id: null,
				scope: {},
				scopeVar: {},
				locals: {},
				parent: null,
				e: null
			});
		};

		components[codename] = self;
		update();
	};
	$(function(){
		update();
	});
	component.get = function(id){
		return components[id];
	};
	component.list = components;
	component.rendered = renderedComponents;
	component.update = update;
	component.lookup = lookupPlaceholders;
	context[nameInContext] = component;
	component.v = boundVariable;
	component.bind = bindVariable;
	component.lookup();

})(this, 'component', jQuery);
