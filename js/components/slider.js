(function(window, $){


	new component('notify', {
		'extend': function(){
			var self = this; // class object

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
		'showIndex': function(index){
			var self = this;
			var slide = self.$slides[index];
			slide.show();
			self.shown[index] = true;
		},
		'hideAll': function(){
			var self = this;
			for (var index in self.shown){
				var slide = self.$slides[index];
				if (self.shown[index]){
					slide.hide();
					self.shown[index] = false;
				}
			}
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
			self.index = 0;
			self.maxIndex = 0;
		},
		'render': function(){
			var self = this;
			self.$slides = self.$e.children();
			self.shown = {};
			self.hideAll();
			self.$e.css({
				'overflow-x': 'hidden'
			});
			self.on('resize', function(){
				self.resize();
			});
			//self.$e.children
		}
	};


})(window, jQuery);
