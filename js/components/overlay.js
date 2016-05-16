(function(){

	var $container = $(document.createElement('div')).css({
		'z-index': 1999999999
	});

	$(function(){
		$('body').append($container);
	});

	new component('overlay', {
		'componentConstruct': function(){
			var self = this; // component
			console.log('construct1', self);
			//var instance = self.instance();
			// Auto append
			var globalInstance = self.appendTo('div', $container);
			//var personal = self.instance;
			self.personal = function(){
				var inst = component.componentInstance(self.codename);
				var tagName = 'div';
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.appendTo($container);
				return component.replace($e.get(0), inst, true); // true = isInstance, return instance
			}
			self.instance = function(){
				return globalInstance; // singleton
			}
			console.log('construct2', globalInstance);
		},
		'render': function(){
			var self = this;
			self.$e.css({
				'background': 'rgba(0,0,0,0.8)',
				'display': 'none',
				'position': 'fixed',
				'top': 0,
				'bottom': 0,
				'left': 0,
				'right': 0,
			});
			var $body = $('body');
			var $bodyOverflow = null;
			var hidden = true;
			self.detach = function(){
				self.$e.detach();
			}
			self.reattach = function(){
				self.$e.appendTo($container); // so it will be on top
			}
			self.show = function(){
				self.$e.show();
				$bodyOveflow = $body.css('overflow') || 'auto';
				$body.css({
					'overflow': 'hidden'
				});
				hidden = false;
			}
			self.hide = function(){
				self.$e.hide();
				$body.css({
					'overflow': $bodyOveflow
				});
				hidden = true;
			}
			self.toggle = function(){
				if (hidden){
					self.show();
				}else{
					self.hide();
				}
			}
			//$body.click(self.toggle);
			//self.$e = $('<div></div>');
			//$b = $('body');

		},
		'service': function(){
			var self = this;
		},
	});
})();
