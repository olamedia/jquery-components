(function(window, $){
	var popups = [];
	var closeAllPopups = function(){
		console.log('close all popups');
		$.each(popups, function(k, popup){
			popup.close();
		});
	};
	$(function(){
		$('body').on('click.popup', closeAllPopups);
	});
	new component('popup', {
		'render': function(){
			var self = this;
			popups.push(self);
			self.$t = self.$e.children('[popup-trigger]');
			self.$p = self.$e.children('[popup-panel]');
			self.$p.css({
				'position': 'absolute'
			});
			self.reposition = function(){
				self.$p.css({
					'left': self.$e.offset().left + 'px'
				});//self.$e.offset().x
			}
			$(window).on('resize', function(){
				self.reposition();
			});
			self.isOpened = false;
			self.toggle = function(){
				self.isOpened?self.close():self.open();
			}
			self.open = function(){
				self.isOpened = true;
				self.reposition();
				self.$e.addClass('active');
				self.$p.show();
				self.$t.attr('aria-expanded', 'true');
			}
			self.close = function(){
				self.isOpened = false;
				self.$e.removeClass('active');
				self.$p.hide();
				self.$t.attr('aria-expanded', 'false');
			}
			if (self.$t.length && self.$p.length){
				self.close();
				// ARIA
				self.$t.attr('aria-haspopup', 'true');
				//self.$p.attr('aria-labelledby', '');
				self.$p.on('click.popup', function(e){
					e.stopPropagation();
				});
				self.$t.on('click.popup', function(e){
					e.preventDefault();
					e.stopPropagation();
					if (!self.isOpened){
						// FIXME don't close nested popups
						//closeAllPopups();
					}
					self.toggle();
				});
			}
		}
	});
})(window, jQuery);
