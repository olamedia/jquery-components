(function(window, $){

	new component('scrollbar', {
		'dragResize': function(dx, dy){
			var self = this;
			self.sync(); // ?
			console.log('self.$bar.position().top', self.$bar.position().top);
			var barTop = self.$bar.position().top + dy;
			var barCenter = barTop + self.barHeight / 2 - self.padding + self.border;
			var scrollCenter = barCenter * self.scrollHeight / self.scrollbarHeight;
			var scrollTop = scrollCenter - self.viewportHeight / 2;
			self.$scrollbar.css({
				'top': scrollTop + 'px'
			});
			self.$bar.css({
				'top': barTop + 'px'
			});
			self.$bar.height(self.barHeight);
		},
		'sync': function(){
			// Syncronize internal variables with real content scrollTop and scrollHeight after browser scroll or resize
			var self = this;
			self.scrollHeight = self.$e[0].scrollHeight;
			self.scrollTop = self.$e.scrollTop();
			self.viewportHeight = self.$e.height();
			self.scrollbarHeight = self.viewportHeight - 2 * (self.padding - self.border);
			self.barHeight = self.scrollbarHeight * self.viewportHeight / self.scrollHeight;
		},
		'resize': function(){
			var self = this;
			self.sync();
			var scrollCenter = self.scrollTop + self.viewportHeight / 2;
			var barCenter = self.scrollbarHeight * scrollCenter / self.scrollHeight;
			var barTop = barCenter - self.barHeight / 2 + (self.padding - self.border);
			//var barTop = self.scrollTopToBarTop(scrollTop);
			self.$scrollbar.css({
				'top': self.scrollTop + 'px'
			});
			self.$bar.css({
				//'position': 'absolute',
				'top': barTop + 'px'
			});
			self.$bar.height(self.barHeight);
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
				console.log('mousedown');
				e.preventDefault();
        return false;
			});
			$(window).on('mouseup', function(e){
				drag = false;
			});
			$(window).on('mousemove', function(e){
				//e.preventDefault();
				if (drag){
					var dy = e.screenY - self.dragY;
					self.dragY = e.screenY;
					self.dragResize(0, dy);
					//self.$e.scrollTop(self.dragStartScrollTop + dy);
					//self.resize();
					//console.log('drag', self.dragStartScrollTop, dy);
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
