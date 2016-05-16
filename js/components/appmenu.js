(function(){





	new component('appmenu', {
		'componentConstruct': function(){
			//component('overlay').instance();
		},
		'render': function(){
			component('style').instance().append(`
				nav.appmenu-component{
					background: #000000;
					background: linear-gradient(to bottom, #000000 3%,#2b2b2b 7%,#1c1c1c 100%);
					color: #ccc;
					min-height: 38px;
					font-family: arial, sans-serif;
					font-size: 14px;

				}
				nav.appmenu-component>ul{
					display: block;
					list-style: none;
					margin: 0;
					padding: 0;
				}
				nav.appmenu-component>ul>li{
					display: inline-block;
					margin: 0;
					padding: 0;
					line-height: 38px;
				}
				nav.appmenu-component>ul>li>h4{
					font-size: 18px;
				    font-weight: bold;
					margin: 0;
					line-height: 38px;
				}
				nav.appmenu-component>ul>li>h4>a{
					display: inline-block;
					color: #fff;
					text-decoration: none;
					padding: 0 14px;
				}
				nav.appmenu-component>ul>li>a{
					display: inline-block;
					color: #ccc;
					text-decoration: none;
					padding: 0 14px;
					border: solid 1px rgba(0, 0, 0, 0);
				    border-top-width: 2px;
				    border-bottom-width: 2px;
				}
				nav.appmenu-component>ul>li.active>a,nav.appmenu-component>ul>li>a.active{
					border-top-color: #F60;
					background: #444444;
					background: linear-gradient(to bottom, #2b2b2b 0%,#1c1c1c 50%);
					border-bottom-color: #1c1c1c;
				}
			`);
			var self = this;
			component(self.codename).instance = function(){
				return self; // singleton
			}
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
			var $right = $('<ul style="float: right;border-left: solid 1px #f00;"></ul>');
			var $moreDropdown = $('<ul></ul>');
			var $moreDropdownLi = $('<li><a>' + self.moreText + ' ▾</a></li>');
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
			}
			adaptSize();

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
				console.log('scroll', lastScrollTop, st, value, top);
			});

			self.scope.unreadMessages = null;
		},
		'service': function(){
			var self = this;
			/*setInterval(function(){
				self.$e.text(timeString());
			}, 1000);*/
		}
	});

})();
