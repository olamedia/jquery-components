(function(window, $, undef){

	/*new component('articleSlider-slide', {
		'render': function(){

		}
	});*/
	component.require(['slider', 'scrollbar'], function(sliderComponent, scrollbarComponent){
		var articleSliderComponent = new component('articleSlider', {
			'includeCss': true,
			'resize': function(){
				var self = this;
				var w = self.$e.width();
				var hw = w/3;
				console.log('articleSlider resize', w, hw);
				if (w > 800){
					self.$headers.show();
					self.$headers.width(hw + 'px');
					self.mediaSlider.$e.css({
						'margin-right': hw + 'px'
					});
				}else{
					self.$headers.hide();
					self.mediaSlider.$e.css({
						'margin-right': 0 + 'px'
					});
				}
			},
			'pause': function(){
				var self = this;
				self.mediaSlider.pause();
			},
			'unpause': function(){
				var self = this;
				self.mediaSlider.unpause();
			},
			'render': function(){
				var self = this;
				self.$e.css({
					'position': 'relative',
				});
				self.$headers = $(document.createElement('div'));
				self.$headers.addClass('articleSlider-headers');
				self.$headers.attr('component', 'scrollbar');
				self.$headers.css({
					'position': 'absolute',
					'right': '0px',
					'top': '0px',
					'bottom': '0px',
					'overflow-x': 'hidden',
				});
				self.$headers.on('mouseenter', function(){
					self.pause();
				});
				self.$headers.on('mouseleave', function(){
					self.unpause();
				});
				self.$mediaSlider = $(document.createElement('div'));
				var $c = self.$e.children();
				self.index = 0;
				for (var i = 0; i < $c.length; i++){
					var $slide = $($c[i]);
					$slide.detach();
					$slide.addClass('articleSlider-slide');
					$slide.appendTo(self.$mediaSlider);
					//var $e = $(document.createElement('div'));
					//var slideComponent = component('articleSlider-slide').instance();
					//slideComponent.replace('');
					//var $media = $slide.children('[articleSlider-media]');
					var $origHeader = $slide.children('[articleSlider-header]');
					var $header = $(document.createElement('div'));
					$header.html($origHeader.html());
					$origHeader.addClass('articleSlider-header');
					$header.addClass('articleSlider-header');
					self.$headers.append($header);
					(function(self, $header, i){
						$header.on('click', function(){
							self.mediaSlider.slideTo(i);
						});
					})(self, $header, i);
				}
				self.$e.append(self.$mediaSlider).append(self.$headers);

				self.mediaSlider = sliderComponent.replace(self.$mediaSlider[0]);//, component('slider').instance(), true
				self.mediaSlider.on('slide-start', function(){
					var $headers = self.$headers.children();
					var $header;
					$header = $($headers.get(self.index));
					console.log('$header', $header);
					$header.removeClass('articleSlider-header-selected');
					self.index = self.mediaSlider.index;
					$header = $($headers.get(self.index));
					$header.addClass('articleSlider-header-selected');
					var t = $header.position().top;
					var b = t + $header.outerHeight(true);
					var st = self.$headers.scrollTop();
					var h = self.$headers.height();
					if (b > st + h){
						// scroll up, touch bottom border
						self.$headers.scrollTop(b - h);
					}
					if (t < st){
						// scroll down, touch upper border
						self.$headers.scrollTop(t);
					}
				});
				self.$e.css({
					'min-height': self.$mediaSlider.outerHeight(true) + 'px'
				});
				self.on('resize', function(){
					self.resize();
				});
				self.resize();
				component.update(self.e);
			}
		});

		articleSliderComponent.ready();
	});
})(window, jQuery);
