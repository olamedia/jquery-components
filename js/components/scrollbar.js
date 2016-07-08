(function(window, $){

	new component('scrollbar', {
		'dragResize': function(dx, dy){
			var self = this;
			self.sync(); // ?
			var barTop = self.$bar.position().top + dy;
			if (barTop < 0){
				barTop = 0;
			}
			if (barTop > self.scrollAreaHeight - self.barHeight){
				barTop = self.scrollAreaHeight - self.barHeight;
			}
			//console.log('self.scrollbarHeight', self.scrollbarHeight, 'barY', barY, 'barTop', barTop);
			//var barCenter = barTop + self.barHeight / 2 - self.padding;// + self.border;
			var scrollCenter = (barTop + self.barHeight / 2) * self.scrollHeight / self.scrollAreaHeight;
			var scrollTop = scrollCenter - self.viewportHeight / 2;
			self.$e.scrollTop(scrollTop);
			self.resize();
			/*self.$scrollbar.css({
				'top': scrollTop + 'px'
			});
			self.$bar.css({
				'top': barTop + 'px'
			});*/
		},
		'resize': function(){
			var self = this;
			self.sync();
			var scrollCenter = self.scrollTop + self.viewportHeight / 2;
			var barCenter = self.scrollAreaHeight * scrollCenter / self.scrollHeight;
			var barTop = barCenter - self.barHeight / 2;
			//var barTop = self.scrollTopToBarTop(scrollTop);
			self.$scrollbar.css({
				'top': self.scrollTop + 'px'
			});
			self.$bar.css({
				//'position': 'absolute',
				'top': barTop + 'px'
			});
		},
		'render': function(){
			var self = this;
			self.sync = function(){
				// Syncronize internal variables with real content scrollTop and scrollHeight after browser scroll or resize
				var self = this;
				self.scrollHeight = self.$e[0].scrollHeight;
				self.scrollLeft = self.$e.scrollLeft();
				self.scrollTop = self.$e.scrollTop();
				self.viewportWidth = self.$e.width();
				self.viewportHeight = self.$e.height();
				self.scrollAreaHeight = self.$scrollArea.height();//self.viewportHeight - 2 * (self.padding - self.border);
				self.barHeight = self.scrollAreaHeight * self.viewportHeight / self.scrollHeight;
				self.$bar.height(self.barHeight);
				var activeY = self.scrollHeight > self.viewportHeight;
				if (self.activeY != activeY){
					console.log('activeY', activeY);
					if (activeY){
						self.$e.addClass('scrollbar-active-y'); // add padding-right
					}else{
						self.$e.removeClass('scrollbar-active-y');
					}
				}
				self.activeY = activeY;
			};
			self.activeX = false;
			self.activeY = false;
			self.options = {
				width: 16
			}
			self.scrollTop = self.$e.scrollTop();
			//self.height = self.$e.height();
			//self.scrollHeight = self.$e[0].scrollHeight;
			self.padding = 5;
			self.border = 1;
			self.$scrollbar = $(document.createElement('div'));
			self.$scrollArea = $(document.createElement('div'));
			self.$bar = $(document.createElement('div'));
			self.$scrollbar.append(self.$scrollArea);
			self.$scrollArea.append(self.$bar);
			self.$e.append(self.$scrollbar);
			var p = self.$e.css("position");
			if ('absolute' == p || 'relative' == p){
			}else{
				self.$e.css({
					'position': 'relative'
				});
			}
			self.$e.css({
				//'overflow-x': 'hidden',
				'overflow-y': 'hidden'
			});
			//self.$scrollbar.width(self.options.width);
			self.$scrollbar.addClass('scrollbar');
			self.$bar.addClass('bar');
			self.$scrollbar.addClass('scrollbar-vertical');
			self.$scrollArea.css({
				'position': 'relative',
				'width': '100%',
				'height': '100%',
			});
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
				if (drag){
					var dy = e.screenY - self.dragY;
					self.dragY = e.screenY;
					self.dragResize(0, dy);
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
