(function(window, $, undef){

	var TYPE_UNDEF = typeof undef;

	new component('slider', {
		'extend': function(){
			var self = this; // class object

		},
		'defaults': {
			'vertical': false,
			'wrap': true, // index wrap
			'delay': 3000, // delay between animations
			'duration': 1000, // animation duration
		},
		'service': function(){
			var self = this;
			self.scheduleSlide();
		},
		'scheduleSlide': function(){
			console.log('scheduleSlide');
			var self = this;
			var f = function(){
				self.next(function(){
					self.scheduleSlide();
				});
			};
			self.timer = setTimeout(f, self.options.delay);
		},
		'slideTo': function(index, cb){
			var self = this;

			if (index >= self.maxIndex){
				if (self.options.wrap){
					index = 0;
				}else{
					index = self.maxIndex - 1;
				}
			}
			if (index < 0){
				if (self.options.wrap){
					index = self.maxIndex - 1;
				}else{
					index = 0;
				}
			}
			self.index = index;
			self.reposition(self.index, true, cb);
			//var w = self.$e.width();
			//self.hideAll();
			//self.showIndex(self.index);
		},
		'reposition': function(index, animate, cb){ // update left for each slide
			animate = animate ? true : false;
			var self = this;
			var $c = self.$e.children();
			var l = $c.length;
			//self.width = self.$e.width();
			self.index = index;
			for (var i = 0; i < l; i++){
				var $slide = $($c.get(i));
				//$slide.text('Slide #' + i);
				var css;
				if (self.options.vertical){
					css = {
						'top': ((i - index) * self.height) + 'px',
						'bottom': (-(i - index) * self.height) + 'px'
					};
				}else{
					css = {
						'left': ((i - index) * self.width) + 'px',
						'right': (-(i - index) * self.width) + 'px'
					};
				}
				if (animate){
					var options = {
						'duration': self.options.duration
					};
					if (i == index){
						options.start = function(){
							self.trigger('slide-start');
						};
						options.done = function(){
							self.trigger('slide-done');
							if (cb){
								cb();
							}
						};
						options.easing = 'swing';
					}else{
						options.easing = 'linear';
					}
					if (i == index){
						$slide.animate(css, options);
					}else{
						(function(self, $slide, css, options){
							setTimeout(function(){
								$slide.animate(css, options);
							}, self.options.duration/3);
						})(self, $slide, css, options);
					}
				}else{
					$slide.css(css);
				}
			}
		},
		'showIndex': function(index){
			var self = this;
			//var slide = self.$slides[index];
			//slide.show();
			//self.shown[index] = true;
			var $slide = $(self.$e.children().get(index));
			self.reposition(index);
			/*$slide.css({
				'left': (index * self.width) + 'px'
			});*/
			$slide.show();
		},
		'hideAll': function(){
			var self = this;
			self.$e.children().hide();
			/*for (var index in self.shown){
				var slide = self.$slides[index];
				if (self.shown[index]){
					slide.hide();
					self.shown[index] = false;
				}
			}*/
		},
		'prev': function(cb){
			var self = this;
			return self.slideTo(self.index-1, cb);
		},
		'next': function(cb){
			var self = this;
			return self.slideTo(self.index+1, cb);
		},
		'resize': function(){
			var self = this; // instance object
			//self.index = 0;
			//self.maxIndex = 0;
			self.width = self.$e.width();
			self.reposition(self.index);
		},
		'render': function(){
			var self = this;
			self.options = {};
			self.options = $.extend({}, self.defaults, self.options);
			self.options.wrap = true;
			self.timer = null;
			self.$e.on('mouseenter', function(){
				clearTimeout(self.timer);
				//self.scheduleSlide();
			});
			self.$e.on('mouseleave', function(){
				clearTimeout(self.timer);
				self.scheduleSlide();
			});
			self.delayLeft = 0;//self.options.delay;
			//console.log('vertical', );
			var v = self.$e.attr('slider-vertical');
			if (false !== v && TYPE_UNDEF !== typeof v){ // ie6+
			//if (self.$e[0].hasAttribute('slider-vertical')){ // ie8+
				self.options.vertical = true;
				console.info('vertical slider', self.options.vertical, self.options);
			}else{
				console.info('horizontal slider', self.options.vertical, self.options);
			}
			console.log('options', self.options);
			self.index = 0;
			var $c = self.$e.children();
			self.maxIndex = $c.length;
			self.width = self.$e.width();
			self.height = 0;//self.$e.height();
			for (var i = 0; i < self.maxIndex; i++){
				var $slide = $($c.get(i));
				$slide.css({
					'overflow': 'hidden'
				});
				var h = $slide.outerHeight(true);
				if (h > self.height){
					self.height = h;
				}
				$slide.css({
					'position': 'absolute',
					'top': '0px',
					'left': '0px',
					'right': '0px',
					'bottom': '0px',
					'height': '100%'
				});
			}

			self.$e.height(self.height);
			//self.$slides = self.$e.children();
			//self.shown = {};
			//self.hideAll();
			//self.showIndex(0);
			self.reposition(self.index);
			self.$e.css({
				'position': 'relative',
				'overflow-x': 'hidden',
				'overflow-y': 'hidden'
			});
			self.on('resize', function(){
				self.resize();
			});
			//self.$e.children
		}
	});


})(window, jQuery);
