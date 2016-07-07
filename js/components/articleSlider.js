(function(window, $, undef){

	new component('articleSlider-slide', {
		'render': function(){

		}
	});

	new component('articleSlider', {
		'render': function(){
			var self = this;
			self.$headers = $(document.createElement('div'));
			self.$headers.css({
				'background': '#00f',
				'overflow-x': 'hidden',
				'min-width': '240px',
				'max-width': '300px',
			});
			self.$mediaSlider = $(document.createElement('div'));
			var $c = self.$e.children();
			for (var i = 0; i < $c.length; i++){
				var $slide = $c[i];
				$slide.detach();
				$slide.appendTo(self.$headers);
				//var $e = $(document.createElement('div'));
				var slideComponent = component('articleSlider-slide').instance();
				slideComponent.replace('');
				var $media = $slide.children('articleSlider-media');
				//var $header = $slide.children('articleSlider-header');
			}
			self.$e.append(self.$mediaSlider).append(self.$headers);
			self.$e.css({
				'min-height': self.$headers.outerHeight(true) + 'px'
			});
		}
	});

})(window, jQuery);
