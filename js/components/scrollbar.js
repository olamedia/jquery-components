(function(window, $){

	new component('scrollbar', {
		'resize': function(){
			var self = this;
			self.$bar.height(self.barHeight());
		},
		'render': function(){
			var self = this;
			self.options = {
				width: 16
			}
			self.scrollTop = self.$e.scrollTop();
			//self.height = self.$e.height();
			//self.scrollHeight = self.$e[0].scrollHeight;
			self.barHeight = function(){
				var h = self.$e.height();
				var sh = self.$e[0].scrollHeight;
				return h * (h / sh);
			}
			self.$scrollbar = $(document.createElement('div'));
			self.$bar = $(document.createElement('div'));
			self.$scrollbar.append(self.$bar);
			self.$e.append(self.$scrollbar);
			var p = self.$e.css("position");
			if ('absolute' == p || 'relative' == p){
			}else{
				self.$e.css({
					'position': 'relative'
				});
			}
			//self.$scrollbar.width(self.options.width);
			self.$scrollbar.addClass('scrollbar');
			self.$bar.addClass('bar');
			self.$scrollbar.addClass('scrollbar-vertical');
			self.$scrollbar.css({
				'position': 'absolute',
				'top': '0px',
				'right': '0px'
				//width: self.options.width + 'px',
				//height: '100%',
			});
			self.$e.on('scroll', function(e){
				var scrollTop = self.$e.scrollTop();
				var viewportHeight = self.$e.height();
				var scrollHeight = self.$e[0].scrollHeight;
				var scrollCenter = scrollTop + viewportHeight / 2;
				var barHeight = self.barHeight();
				var lh = h - bh;
				var barCenter = scrollCenter / (scrollHeight / viewportHeight);
				var barTop = barCenter - barHeight / 2;
				self.$bar.css({
					'position': 'absolute',
					'top': barTop + 'px'
				});
			});
			self.on('resize', function(){
				self.resize();
			});
			self.resize();
		}
	});

})(window, jQuery);
