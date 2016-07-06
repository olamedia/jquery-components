(function(window, $){


	new component('slider', {
		'extend': function(){
			var self = this; // class object

		},
		'defaults': {
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
			setTimeout(f, self.options.delay);
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
			self.width = self.$e.width();
			for (var i = 0; i < l; i++){
				var $slide = $($c.get(i));
				//$slide.text('Slide #' + i);
				var css = {
					'left': ((i - index) * self.width) + 'px',
					'right': (-(i - index) * self.width) + 'px'
				};
				if (animate){
					var options = {
						'duration': self.options.duration
					};
					if (i == index){
						options.done = function(){
							if (cb){
								cb();
							}
						};
					}
					$slide.animate(css, options);
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
			self.options = self.options || {};
			self.options = $.extend(self.defaults, self.options);
			self.options.wrap = true;
			self.index = 0;
			var $c = self.$e.children();
			self.maxIndex = $c.length;
			self.width = self.$e.width();
			self.maxHeight = 0;//self.$e.height();
			for (var i = 0; i < self.maxIndex; i++){
				var $slide = $($c.get(i));
				var h = $slide.outerHeight(true);
				if (h > self.maxHeight){
					self.maxHeight = h;
				}
				$slide.css({
					'position': 'absolute',
					'top': '0px',
					'left': (self.width) + 'px',
					'height': '100%'
				});
			}
			self.$e.height(self.maxHeight);
			//self.$slides = self.$e.children();
			//self.shown = {};
			//self.hideAll();
			//self.showIndex(0);
			self.reposition(self.index);
			self.$e.css({
				'position': 'relative',
				'overflow-x': 'hidden'
			});
			self.on('resize', function(){
				self.resize();
			});
			//self.$e.children
		}
	});


})(window, jQuery);
