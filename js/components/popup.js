(function(window, $){
	var popups = [];
	var closeAllPopups = function(filteredComponent){
		console.log('close all popups(',filteredComponent,')');
		$.each(popups, function(k, popup){
			//filtered
			var isFiltered = false;
			if (filteredComponent && filteredComponent.parent){
				var check = filteredComponent;
				console.log('check parents', check.e);
				while (null !== check && check.parent){
					console.log('parent', check.e);
					if (check === popup){
						isFiltered = true;
					}
					check = check.parent();
					console.log('check', check);
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
				'left': (self.$e.offset().left - self.$e.offsetParent().offset().left + (self.aside?self.$e.outerWidth():0)) + 'px'
			});
			if (self.aside){
				self.$p.css({
					'top': (self.$e.offset().top - self.$e.offsetParent().offset().top) + 'px'
				});
			}
		},
		'render': function(){
			var self = this;
			popups.push(self);
			self.$t = self.$e.children('[popup-trigger]');
			self.$p = self.$e.children('[popup-panel]');
			self.$p.css({
				'position': 'absolute'
			});
			self.aside = !!self.$e.attr('popup-aside');

			self.on('resize', function(){
				self.resize();
			});
			/*self.reposition = function(){
				self.$p.css({
					'left': (self.$e.offset().left - self.$e.offsetParent().offset().left) + 'px'
				});//self.$e.offset().x
			}
			self.on('resize', function(){
				self.reposition();
			});*/
			self.focusNext = function(){
				var $items = self.$p.find('a');
			    if (!$items.length){
					return;
				}
				var index = $items.index(e.target);
				if (index > 0){
					index--;
				}

			}
			self.panelKeydown = function(e){
				if (!/(13|37|38|39|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)){
					return;
				}
				e.preventDefault();
    			e.stopPropagation();
				// isOpened === true
				if (e.which == 27){ // Esc
					return self.toggle();
				}
				if (e.which == 37){ // Left
					if (self.aside){
						return self.close();
					}
				}
				var $items = self.$p.find('a');
				if (!$items.length){
					return;
				}
				var index = $items.index(e.target);
				if (e.which == 38){ // Up
					if (index > 0){
						index--;
					}else{
						if (!self.aside){
							self.close();
						}
					}
				}
				if (e.which == 40){ // Down
					if (index < $items.length - 1){
						index++;
					}else{
						if (!self.aside){
							self.close();
							// focus on next element after trigger parent
						}
					}
				}
				if (!~index) {
					index = 0
				}
				$items.eq(index).focus();
			}
			self.triggerKeydown = function(e){
				if (!/(13|27|32)/.test(e.which)){
					return;
				}
				if (e.which == 39 && !self.aside){
					return; // right while not aside
				}
				if (e.which == 40 && self.aside){
					return; // down while aside
				}
				self.open();
				e.preventDefault();
    			e.stopPropagation();
			}
			self.$t.on('keydown', function(e){
				self.triggerKeydown(e);
			});
			self.$p.on('keydown', function(e){
				if (self.isOpened){
					self.panelKeydown(e);
				}
			});
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
				self.$p.focus();
			}
			self.close = function(){
				self.isOpened = false;
				self.$e.removeClass('focused');
				self.$p.hide();
				self.$t.attr('aria-expanded', 'false');
				self.$t.focus();
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
