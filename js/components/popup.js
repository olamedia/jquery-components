(function(window, $){
	var popups = [];
	var closeAllPopups = function(filtered){
		console.log('close all popups(',filtered,')');
		$.each(popups, function(k, popup){
			//filtered
			var isFiltered = false;
			if (filtered && filtered.parent){
				var check = filtered;
				console.log('check parents', check.e);
				if (check === popup){
					isFiltered = true;
				}
				while (check = check.parent()){
					console.log('parent', check.e);
					if (check === popup){
						isFiltered = true;
					}
				}
			}
			if (!isFiltered){
				popup.close();
			}
		});
	};
	$(function(){
		$('body').on('click.popup', function(){
			closeAllPopups();
		});
	});
	new component('popup', {
		'resize': function(){
			var self = this;
			console.log(self);
			self.$p.css({
				'left': (self.$e.offset().left - self.$e.offsetParent().offset().left) + 'px'
			});
		},
		'render': function(){
			var self = this;
			popups.push(self);
			self.$t = self.$e.children('[popup-trigger]');
			self.$p = self.$e.children('[popup-panel]');
			self.$p.css({
				'position': 'absolute'
			});
			/*self.on('resize', function(){
				self.resize();
			});*/
			/*self.reposition = function(){
				self.$p.css({
					'left': (self.$e.offset().left - self.$e.offsetParent().offset().left) + 'px'
				});//self.$e.offset().x
			}
			self.on('resize', function(){
				self.reposition();
			});*/
			self.isOpened = false;
			self.toggle = function(){
				self.isOpened?self.close():self.open();
			}
			self.open = function(){
				self.isOpened = true;
				self.resize();
				self.$e.addClass('focused');
				self.$p.show();
				self.$t.attr('aria-expanded', 'true');
			}
			self.close = function(){
				self.isOpened = false;
				self.$e.removeClass('focused');
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
						// FIXME don't close parent popups
						console.log('closeAllPopups', self);
						closeAllPopups(self);
					}
					self.toggle();
				});
			}
		}
	});
})(window, jQuery);
