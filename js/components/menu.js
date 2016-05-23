(function(window, $){

	new component('menu', {
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
		}
	});

})(window, jQuery);
