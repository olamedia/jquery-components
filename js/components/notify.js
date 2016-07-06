(function(window, $){

	new component('notify', {
		'render': function(){
			var self = this;
			self.options = self.options || {};
			self.delay = self.options.delay || 3200;
			self.$alert = $(document.createElement('div'));
			self.$e.append(self.$alert);
			self.$e.css({
				'position': 'relative',
				//'margin-bottom': '1em'
			});
			self.$alert.hide();
			self.detach = function(){
				self.$alert.css({
					'position': 'absolute',
				});
				var h = self.$alert.outerHeight(true)-2;
				self.$e.height(h);
				self.$e.animate({
					opacity: 0.01,
					'margin-top': "-" + h + 'px'
				}, 1000);
				self.$alert.animate({
					opacity: 0.01,
					'left': "500",
					'margin-top': h + 'px',
					height: "toggle"
				}, 1000, function(){
					self.$e.detach();
				});
			};
			self.release = function(){
				self.$alert.on('mouseenter', self.cancelDetach);
				self.$alert.on('mouseleave', self.scheduleDetach);
				self.scheduleDetach();
			}
			self.update = function(text, state){
				self.$m.text(text);
				if (state){
					self.$alert.attr('class', '');
					self.$alert.addClass('alert alert-' +state);
				}
			};
			self.cancelDetach = function(){
				if (self.timer){
					clearTimeout(self.timer);
				}
			};
			self.scheduleDetach = function(){
				self.cancelDetach();
				self.timer = setTimeout(self.detach, self.delay);
			};
			if (!self.options.sticky){
				self.release();
			}


			self.$alert.addClass('alert');
			self.$alert.css({
				'width': '180px',
				//'margin-bottom': '0'
			});

			self.$close = $('<button type="button" class="close">&times;</button>');// type="button"
			self.$alert.append(self.$close);
			self.$close.on('click', function(){
				self.detach()
			});

			self.$m = $(document.createElement('div'));
			self.$alert.append(self.$m);
			if (self.options.class){
				self.$alert.addClass(self.options.class);
			}
			if (self.options.text){
				self.$m.text(self.options.text);
			}else{
				console.error('No text passed');
			}

			self.$alert.slideDown();

			alertsLayer.resize();

		}
	});

	var alertsLayer = component.layer();
	console.log('alertsLayer', alertsLayer);
	alertsLayer.$e.attr('id', 'notify-layer');
	alertsLayer.setPosition('top center');

	var notifyBase = function(options){
		return component('notify').prependTo('div', alertsLayer.$e, options || {});
	}
	var notify = function(text, options, state){
		var options = options || {};
		options.text = text;
		if (state){
			options.class = 'alert-' + state;
		}
		return notifyBase(options);
	};
	notify.container = alertsLayer;
	notify.info = function(text, options){
		return component.notify(text, options, 'info');
	}
	notify.success = function(text, options){
		return component.notify(text, options, 'success');
	}
	notify.error = function(text, options){
		return component.notify(text, options, 'error');
	}
	notify.danger = function(text, options){
		return component.notify(text, options, 'error');
	}
	notify.warn = function(text, options){
		return component.notify(text, options, 'warn');
	}
	notify.setSpacing = function(spacing){
		alertsLayer.setSpacing(spacing);
	};
	component.notify = notify;


//notify.setSpacing('32px');
	component.notify.setSpacing(40);
	/*component.growl({
		'text': 'message text'
	});*/
	for (var i = 1; i < 30; i++){
		(function(k){
			setTimeout(function(){
				//component.notify.success('message text ' + k);
			}, 200*k);
		})(i);
	}

	//component.growl = alertsLayer;




	/*new component('growl', , function(){
		//self.append =
		var self = this;
		component(self.codename).instance = function(){
			return self; // singleton
		}
		self.alert = function(options){
			//self.$e.append(document.createTextNode(text));
		}
	});





	component.growl = function(options){
		options = options || {};
		return new modal(options);
	};*/

})(window, jQuery);
