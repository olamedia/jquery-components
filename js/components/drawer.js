(function(){



	new component('drawer', {
		'componentConstruct': function(){
			var self = this;
			console.log('drawer construct1', self);
			self.detached = function(){
				var inst = component.componentInstance(self.codename);
				var tagName = 'div';
				var $e = $('<'+tagName+'></'+tagName+'>');
				$e.attr('drawer', 'true');
				//$e.appendTo($container);
				return component.replace($e.get(0), inst, true); // true = isInstance, return instance
			}
		},
		'render': function(){
			var self = this;
			self.width = 300;
			var opened = false;
			var right = false;
			var mouseover = false;
			self.$e.on('click', function(e){
				e.stopPropagation();
			});
			self.closeOnBodyClick = function(){
				self.close();
				console.log('closeOnBodyClick');
			};
			var scrollbarWidth = (function(){
				var $inner = $(document.createElement('div'));
				var $test = $(document.createElement('div')).css({'overflow-y': 'scroll'}).append($inner);
				$('body').append($test);
				var w = $test.width() - $inner.width();
				$test.detach();
				return w;
			})();
			self.scrollEmu = component('overlay').personal();
			self.scrollEmu.$e.css({
				'background': '#fff',
				'overflow-x': 'hidden',
				'overflow-y': 'scroll',
				'left': '',
				'width': scrollbarWidth + 'px'
			});
			self.scrollContent = $(document.createElement('div'));
			self.scrollEmu.$e.append(self.scrollContent);
			var updateContentHeight = function(){
				self.scrollContent.height($(document).height());
			}
			var openPseudoScrollBar = function(){
				updateContentHeight();
				self.scrollEmu.$e.show();
				// sync scroll position
				self.scrollEmu.$e.scrollTop($('body').scrollTop());
			};
			var closePseudoScrollBar = function(){
				self.scrollEmu.$e.hide();
			};


			self.overlay = component('overlay').personal();

			self.overlay.$e.append(self.$e);
			self.overlay.$e.css({
				'left': '',
				'right': '',
				'bottom': '',
				'top': '0',
				'position': 'absolute'
			});
			$('body').css({
				'overflow': 'auto'
			});
			self.overlay.detach();
			self.overlay.$e.show();
			self.$e.css({
				'position': 'fixed',
				'width': self.width + 'px',
				'top': '0',
				'bottom': '0',
				'overflow': 'hidden',
				'overflow-y': 'auto',
				'background': '#fff',
				'padding-bottom': '50px',
			});
			self.$container = $(document.createElement('div'));
			self.$container.css({
				'padding': '1em 20px',
				'min-height': '110%',
			});
			var $body = $('body');


			//console.log('scrollbarWidth', scrollbarWidth);
			self.$e.append(self.$container);

			var preventBodyScroll = function(){
				$body.css({
					'overflow-y': 'hidden',
				});
				$('html').css({
					'border-right': ($(window).height() < $(document).height()) ? 'solid ' + scrollbarWidth + 'px #fff' : 'none'
				});
				openPseudoScrollBar();
				if (right){
					self.$e.css({
						'right': ($(window).height() < $(document).height()) ? scrollbarWidth + 'px' : 0
					});
				}
				$(window).trigger('resize');
			}
			var allowBodyScroll = function(){
				$body.css({
					'overflow-y': '',
				});
				$('html').css({
					'border-right': ''
				});
				closePseudoScrollBar();
				if (right){
					self.$e.css({
						'right': 0
					});
				}
				$(window).trigger('resize');
			}
			self.$e.on('mouseenter', function(e){
				mouseover = true;
				preventBodyScroll();
			});
			self.$e.on('mouseleave', function(e){
				mouseover = false;
				allowBodyScroll();
			});
			/*self.$e.on('mousewheel', function(){
				event.stopPropagation();
			});*/
			/*$('body').on('scroll', function(e){
				if (!opened){
					console.log('scroll not prevented - not opened');
					return;
				}
				if (!mouseover){
					console.log('scroll not prevented - not mouse over');
					return;
				}
				if ($.contains(self.e, e.target)){
					console.log('scroll not prevented - target not inside');
					return; // scroll target is inside drawer, do not prevent
				}
				console.log('scroll prevented');
				e.preventDefault();
				e.stopPropagation();
				return false;
			});*/
			/*$(document).on('scroll', function(e){
				e.preventDefault();
				e.stopPropagation();
			});*/
			self.append = function(el){
				self.$container.append(el);
			};
			self.left = function(){
				self.$e.css({
					'left': -self.width + 'px',
					'right': '',
					'box-shadow': '5px 10px 15px 5px rgba(0,0,0,.1)',
					'transition': 'left .5s'
				});
				right = false;
			}
			self.right = function(){
				self.$e.css({
					'left': '',
					'right': -self.width + 'px',
					'box-shadow': '5px -10px 15px 5px rgba(0,0,0,.1)',
					'transition': 'right .5s'
				});
				right = true;
			}
			var animateMs = 100;
			self.open = function(){
				self.overlay.detach();
				self.overlay.reattach();
				self.$e.stop();
				if (right){
					self.$e.animate({
						'right': 0,
					}, animateMs, 'linear');
				}else{
					self.$e.animate({
						'left': 0,
					}, animateMs, 'linear');
				}
				//var bodyScroll = $(window).height() < $(document).height();
				$('body').on('click', self.closeOnBodyClick);
				opened = true;
			}
			self.close = function(){
				allowBodyScroll();
				$('body').off('click', self.closeOnBodyClick);
				opened = false;
				self.$e.stop();
				var finish = function(){
					self.overlay.detach();
				}
				if (right){
					self.$e.animate({
						'right': -self.width,
					}, animateMs, 'linear', finish);
				}else{
					self.$e.animate({
						'left': -self.width,
					}, animateMs, 'linear', finish);
				}
			}
		},
		'service': function(){

		}
	});
})();
