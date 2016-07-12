(function(window, $){
	var menuComponent = new component('menu', {
		'includeCss': true,
		'render': function(){
			var self = this;
			self.focus = function(){
				console.log('focus');
				var $items = self.$e.find('a');
				if ($items.length){
					console.log('focus first');
					$($items.get(0)).focus();
				}
				//self.$e.focus();
			};
			self.$e.on('click', function(){
				self.focus();
			});
			self.keydown = function(e){
				if (!/(38|40)/.test(e.which) || /input|textarea/i.test(e.target.tagName)){
					return;
				}
				console.log('menu keydown', e.which);
				e.preventDefault();
    			e.stopPropagation();
				var $items = self.$e.find('a');//.not('.menu a');
				if (!$items.length){
					return;
				}
				var index = $items.index(e.target);
				if (e.which == 38){ // Up
					if (index > 0){
						index--;
					}
				}
				if (e.which == 40){ // Down
					if (index < $items.length - 1){
						index++;
					}
				}
				if (!~index) {
					index = 0
				}
				$items.eq(index).focus();
			}
			self.$e.on('keydown', function(e){
				self.keydown(e);
			});
		}
	});
	menuComponent.ready();
})(window, jQuery);
