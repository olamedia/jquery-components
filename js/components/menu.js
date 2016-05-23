(function(window, $){

	new component('menu', {
		'render': function(){

			var self = this;
			self.focus = function(){
				var $items = self.$e.find('a');
				if ($items.length){
					$($items.get(0)).focus();
				}
				//self.$e.focus();
			};
			self.$e.on('focus', function(){
				self.focus();
			});
		}
	});

})(window, jQuery);
