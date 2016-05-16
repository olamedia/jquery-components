(function(){



	new component('drawer', {
		'componentConstruct': function(){
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
