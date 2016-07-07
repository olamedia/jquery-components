(function(window, $){

	new component('scrollbar', {
		'render': function(){
			var self = this;
			self.options = {
				width: 16
			}
			self.$scrollbar = $(document.createElement('div'));
			self.$bar = $(document.createElement('div'));
			self.$scrollbar.append(self.$bar);
			self.$e.append(self.$scrollbar);
			//self.$scrollbar.width(self.options.width);
			self.$scrollbar.addClass('scrollbar');
			self.$scrollbar.addClass('scrollbar-vertical');
			self.$scrollbar.css({
				width: self.options.width + 'px',
				height: '100%',
			});
		}
	});

})(window, jQuery);
