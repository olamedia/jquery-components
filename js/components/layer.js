(function(window, $){

	var layers = [];

	var layer = function(options){
		var self = this;
		self.$e = $(document.createElement('div'));
		layers.push(self);

		//self.

	};

	new component('layer', {
		'resize': function(){
			var self = this;
			if (self.center){
				var w = self.$e.width();
				var ww = $('body').width();
				self.$e.css({
					'left': Math.floor((ww-w)/2)+'px'
				});
			}
			if (self.middle){
				var h = self.$e.height();
				var wh = $('body').height();
				self.$e.css({
					'top': Math.floor((wh-h)/2)+'px'
				});
			}
		},
		'setSpacing': function(size){
			var self = this;
			self.spacing = size;
			self.updatePosition();
		},
		'updatePosition': function(){
			var self = this;
			var css = {
				'left': '',
				'top': '',
				'bottom': '',
				'right': '',
			};
			var position = self.position.split(' ');
			for (var k in position){
				if ('center' == position[k]){ // horizontal
					self.center = true;
				}
				if ('middle' == position[k]){ // vertical
					self.middle = true;
				}
				if ('top' == position[k]){
					css['top'] = self.spacing + 'px';
				}
				if ('left' == position[k]){
					css['left'] = self.spacing + 'px';
				}
				if ('right' == position[k]){
					css['right'] = self.spacing + 'px';
				}
				if ('bottom' == position[k]){
					css['bottom'] = self.spacing + 'px';
				}
			}
			self.$e.css(css);
			self.resize();
		},
		'setPosition': function(position){
			var self = this;
			self.position = position;
			self.updatePosition();
		},
		'render': function(){
			var self = this;
			self.spacing = 0;
			self.position = 'top center';
			//self.$close = $('<button type="button" class="close">&times;</button>');// type="button"
			//self.$e.append(self.$close);
			self.center = false;
			self.middle = false;
			self.$h = $(document.createElement('h4'));
			self.$m = $(document.createElement('div'));
			if (self.options && self.options.title){
				self.$e.append(self.$h);
				self.$h.text(self.options.title);
			}
			self.$e.append(self.$m);
			if (self.options && self.options.text){
				self.$m.text(self.options.text);
			}
			self.options = self.options || {};
			self.css = self.options.css || {};
			self.$e.css({
				'position': 'fixed',
				//'padding': '40px',
				//'background': '#f00'
			});
			if (self.options && self.options.position){
				self.setPosition(self.options.position);
			}
			if (self.options && self.options.class){
				self.$e.addClass(self.options.class);
			}
			self.$e.css(self.css);
			self.on('resize', function(){
				self.resize();
			});
			self.resize();
			self.detach = function(){
				self.$e.fadeOut(function(){
					self.$e.detach();
				});
			}
			//self.$close.on('click', function(){
			//	self.detach()
			//});
		}
	});
	var layersContainer = document.createElement('div');
	var $layersContainer = $(layersContainer);
	$layersContainer.attr('id', 'layers-container');
	$layersContainer.css({
		'position': 'static',
	});
	$(function(){
		$('body').append($layersContainer);
		/*var layer = component.layer({
			title: 'Title',
			text: 'message text',
			position: 'middle center',
			class: 'alert alert-danger',
		});*/
		//layer.$e.text('Boo');
	});

	component.layer = function(options){
		return component('layer').appendTo('div', layersContainer, options || {});
	};



})(window, jQuery);
