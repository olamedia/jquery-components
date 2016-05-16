(function(){



	new component('drawer', {
		'componentConstruct': function(){
			var self = this;
			console.log('drawer construct1', self);
			self.detached = function(){
				var inst = component.componentInstance(self.codename);
				var tagName = 'div';
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.attr('drawer', 'true');
				//$e.appendTo($container);
				return component.replace($e.get(0), inst, true); // true = isInstance, return instance
			}
		},
		'render': function(){
			var self = this;
			self.overlay = component('overlay').personal();
			self.overlay.$e.append(self.$e);
			self.overlay.$e.css({
				'left': '',
				'right': '',
				'bottom': '',
				'top': '0',
				'position': 'absolute'
			});
			self.overlay.detach();
			self.overlay.$e.show();
			self.$e.css({
				'position': 'fixed',
				'width': '300px',
				'top': '0',
				'bottom': '0',
				'overflow': 'hidden',
				'overflow-y': 'auto',
				'background': '#fff',
				'padding-bottom': '50px'
			});
			self.$container = $(document.createElement('div'));
			self.$container.css({
				'min-height': '110%',
			});
			self.$e.append(self.$container);
			self.append = function(el){
				self.$container.append(el);
			};
			self.left = function(){
				self.$e.css({
					'left': 0,
					'box-shadow': '5px 10px 15px 5px rgba(0,0,0,.1)'
				});
			}
			self.open = function(){
				self.overlay.reattach();
			}
			self.close = function(){
				self.overlay.detach();
			}
		},
		'service': function(){

		}
	});
})();
