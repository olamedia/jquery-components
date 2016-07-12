(function(){





	var appmenuComponent = new component('appmenu', {
		'render': function(){
			var self = this;
			self.moreText = self.$e.attr('more-text') || 'more';
			//component('overlay').instance();
			var $placeholder = self.$e;
			var overlay = component('overlay').personal();
			overlay.$e.attr('personal', 'true');
			overlay.$e.css({
				'bottom': 'none',
				'height': '42px'
			});
			overlay.$e.show();
			$placeholder.css({
				'height': '42px'
			});
			$placeholder.removeClass('appmenu-component');
			//var ada
			var $nav = $('<nav class="appmenu-component"></nav>');
			var $left = $('<ul style=""></ul>');//display: table-cell;
			var $right = $('<ul style="float: right;"></ul>');
			var $moreDropdown = $('<ul popup-panel class="menu" style="display: none;border-top: none 0px; margin-left: -1px;"></ul>');
			var $moreDropdownLi = $('<li component="popup"><a popup-trigger>' + self.moreText + ' ▾</a></li>');
			//component.update($nav.get(0));

			$moreDropdownLi.append($moreDropdown);
			var $ul = self.$e.children('ul');
			$ul.detach();
			overlay.$e.append($nav);
			$nav.append($right).append($left);
			var moreMenu = [];
			var longMenu = [];
			$ul.children('li').each(function(){
				var li = this;
				var $li = $(li);
				$li.detach();
				if ($li.is('[right]')){
					$li.removeAttr('right');
					//self.accountMenuLi = li;
					$right.append($li);
				}else if ($li.is('[brand]')){
					$li.removeAttr('brand');
					self.brandLi = li;
					$left.append($li);
				}else{
					moreMenu.push(li);
				}
				//console.log(li);
			});
			var dropAllItems = function(){
				$moreDropdownLi.detach();
				while (dropMenuItem()){

				}
			}
			var pullMenuItem = function(){
				var li;
				if (li = moreMenu.shift()){
					var $li = $(li);
					$li.detach();
					$left.append($li);
					longMenu.push(li);
					return li;
				}
				return null;
			}
			var dropMenuItem = function(){
				var li;
				if (li = longMenu.pop()){
					var $li = $(li);
					$li.detach();
					$moreDropdown.prepend($li);
					moreMenu.unshift(li);
					return li;
				}
				return null;
			}
			var adaptSize = function(){
				// adapt overlay
				var offset = $placeholder.offset();
				console.log();
				overlay.$e.css({
					'left': offset.left,
					'right': $(window).width() - (offset.left + $placeholder.innerWidth())
				});
				dropAllItems();
				$moreDropdownLi.detach();
				var widthAvailable = self.$e.innerWidth() - $right.outerWidth();
				var leftWidth = $(self.brandLi).outerWidth();
				var space = 100;
				var li;
				while (li = pullMenuItem()){
					var $li = $(li);
					var lw = $li.outerWidth();
					if (leftWidth + lw + space > widthAvailable){
						dropMenuItem();
						break;
					}
					leftWidth += lw;
				}
				// append dropdown
				if (moreMenu.length){
					$left.append($moreDropdownLi);
					var lw = $moreDropdownLi.outerWidth();
					if (leftWidth + lw + space > widthAvailable){
						dropMenuItem();
						//break;
					}
				}
				component.update($nav.get(0));
				// $(window).trigger('component-resize');
			}
			adaptSize();
			$(function(){
				adaptSize();
			});
			$(window).on('resize', adaptSize);
			var lastScrollTop = $(window).scrollTop();
			$(window).on('scroll', function(e){
				var st = $(window).scrollTop();
				var value = st - lastScrollTop;
				var top = overlay.$e.position().top;
				if (st > lastScrollTop){
					// downscroll code
					top = top - value;
					if (top < -42){
						top = -42;
					}
					overlay.$e.css({
						'top': top + 'px'
					});
				} else {
					// upscroll code
					top = top - value;
					if (top > 0){
						top = 0;
					}
					overlay.$e.css({
						'top': top + 'px'
					});
				}
				lastScrollTop = st;
				//console.log('scroll', lastScrollTop, st, value, top);
			});
			//component.update();
			self.scope.unreadMessages = null;
		},
		'service': function(){
			var self = this;
			/*setInterval(function(){
				self.$e.text(timeString());
			}, 1000);*/
		}
	});
	appmenuComponent.ready();
})();
