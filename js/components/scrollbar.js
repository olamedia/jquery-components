(function(window, $){

	new component('scrollbar', {
		'barTopToScrollTop': function(barTop){
			var self = this;
			var viewportHeight = self.$e.height();//outerHeight(true);
			var scrollbarHeight = viewportHeight - self.padding * 2;
			var scrollHeight = self.$e[0].scrollHeight;
			//var scrollCenter = scrollTop + viewportHeight / 2;
			var barHeight = scrollbarHeight * viewportHeight / scrollHeight - 2 * self.border;

			var barCenter = barTop + barHeight / 2 - self.padding + self.border;
			var scrollCenter = barCenter * scrollHeight / scrollbarHeight;
			var scrollTop = scrollCenter - viewportHeight / 2;
			return scrollTop;
		},
		'scrollTopToBarTop': function(scrollTop){
			var self = this;
			var viewportHeight = self.$e.height();//outerHeight(true);
			var scrollbarHeight = viewportHeight - self.padding * 2;
			var scrollHeight = self.$e[0].scrollHeight;
			var scrollCenter = scrollTop + viewportHeight / 2;
			var barHeight = scrollbarHeight * viewportHeight / scrollHeight - 2 * self.border;
			//var lh = h - bh;
			var barCenter = scrollbarHeight * scrollCenter / scrollHeight;
			var barTop = barCenter - barHeight / 2 + self.padding - self.border;
			return barTop;
		},
		'barHeight': function(){
			var self = this;
			var scrollTop = self.$e.scrollTop();
			var viewportHeight = self.$e.height();//outerHeight(true);
			var scrollbarHeight = viewportHeight - self.padding * 2 - 2 * self.border;
			var scrollHeight = self.$e[0].scrollHeight;
			//var scrollCenter = scrollTop + viewportHeight / 2;
			var barHeight = scrollbarHeight * viewportHeight / scrollHeight;
			return barHeight;
		},
		'dragResize': function(dx, dy){
			var self = this;
			var barTop = self.$bar.offset().top + dy;
			var scrollTop = self.barTopToScrollTop(barTop);
			self.$scrollbar.css({
				'top': scrollTop + 'px'
			});
			self.$bar.css({
				'top': barTop + 'px'
			});
			self.$bar.height(self.barHeight());
		},
		'resize': function(){
			var self = this;
			var scrollTop = self.$e.scrollTop();
			var barTop = self.scrollTopToBarTop(scrollTop);
			self.$scrollbar.css({
				'top': scrollTop + 'px'
			});
			self.$bar.css({
				//'position': 'absolute',
				'top': barTop + 'px'
			});
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
			self.padding = 5;
			self.border = 1;
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
			self.$e.css({
				'overflow-y': 'scroll'
			});
			//self.$scrollbar.width(self.options.width);
			self.$scrollbar.addClass('scrollbar');
			self.$bar.addClass('bar');
			self.$scrollbar.addClass('scrollbar-vertical');
			self.$scrollbar.css({
				'position': 'absolute',
				'top': '0px',
				'right': '0px',
				'user-select': 'none'
				//width: self.options.width + 'px',
				//height: '100%',
			});
			self.$scrollbar.on('dragstart', function(e){ // prevent drag
				e.preventDefault();
				return false;
			});
			self.$scrollbar.on('selectstart', function(e){ // prevent select
				e.preventDefault();
				return false;
			});
			var drag = false;
			self.$bar.on('mousedown', function(e){
				self.dragStartScrollTop = self.$e.scrollTop();
				self.dragStartY = e.screenY;
				self.dragY = e.screenY;
				drag = true;
			});
			$(window).on('mouseup', function(e){
				drag = false;
			});
			$(window).on('mousemove', function(e){
				//e.preventDefault();
				if (drag){
					var dy = e.screenY - self.dragStartY;
					self.dragY = e.screenY;
					self.$e.scrollTop(self.dragStartScrollTop + dy);
					self.resize();
					console.log('drag', self.dragStartScrollTop, dy);
				}
			});
			self.$e.on('scroll', function(e){
				self.resize();
			});
			self.on('resize', function(){
				self.resize();
			});
			self.resize();
		}
	});

})(window, jQuery);
