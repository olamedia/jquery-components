(function(window, $){


	new component('slider', {
		'extend': function(){
			var self = this; // class object

		},
		'slideToCurrent': function(){

		},
		'slideTo': function(index){
			var self = this;

			if (index > self.maxIndex){
				if (self.options && self.options.wrap){
					index = 0;
				}else{
					index = self.maxIndex;
				}
			}
			if (index < 0){
				if (self.options && self.options.wrap){
					index = self.maxIndex;
				}else{
					index = 0;
				}
			}
			self.index = index;

			//var w = self.$e.width();
			self.hideAll();
			self.showIndex(self.index);
		},
		'reposition': function(index){ // update left for each slide
			var self = this;
			var $c = self.$e.children();
			var l = $c.length;
			self.width = self.$e.width();
			for (var i = 0; i < l; i++){
				var $slide = $($c.get(i));
				$slide.text('Slide #' + i);
				$slide.css({
					'left': ((i - index) * self.width) + 'px',
					'right': ((i - index + 1) * self.width) + 'px'
				});
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
		'prev': function(){
			var self = this;
			return self.slideTo(self.index-1);
		},
		'next': function(){
			var self = this;
			return self.slideTo(self.index+1);
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
			self.$e.css({
				'background': '#f00',
				'border': 'solid 1px #0f0'
			});
			self.index = 0;
			var $c = self.$e.children();
			self.maxIndex = $c.length;
			self.width = self.$e.width();
			self.maxHeight = self.$e.height();
			for (var i = 0; i < self.maxIndex; i++){
				var $slide = $($c.get(i));
				var h = $slide.height();
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
