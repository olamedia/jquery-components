var placeholders = {};
var placeholder = function(e){
	var self = this;
	self.components = {};
	self.active = [];
	self.e = e;
	self.$e = $(e);
	self.replace = function(component, instance, options){
		var el = self.e;
		var componentName = component.componentName;
		if ('undefined' !== typeof self.components[componentName] && true === self.components[componentName]){
			return; // already activated the same component
		}
		// activate ++
		self.components[componentName] = true;
		self.active.push(componentName);
		self.$e.attr('component-active', self.active.join(' '));
		// activate --
		self.$e.addClass(componentName + '-component');
		instance.options = options;
		self.e.component = instance;
		self.$e.attr(componentName + '-component', instance.id);
		instance.e = self.e;
		instance.$e = self.$e;
		//renderedComponents.push(c);
		instance.init();
		return instance; // return instance
	}
};

var getPlaceholder = function(e){
	if ('undefined' === typeof e.componentPlaceholder){
		e.componentPlaceholder = new placeholder(e);
	}
	var p = e.componentPlaceholder;
	return p;
};

component.lookup = function(context){
	//console.log('lookupPlaceholders', context);
	var list = null;
	var selector = '[component]';
	if (context){
		list = $(selector, context)
	}else{
		list = $(selector)
	}
	var found = 0;
	var foundComponents = [];
	list.each(function(){
		var el = this;
		var placeholder = getPlaceholder(el);
		//console.log('found', el, placeholder);
		var cid = placeholder.$e.attr('component');
		var cida = cid.split(' ');
		var inactive = 0;
		for (var k in cida){
			var componentName = cida[k];
			if (!placeholders[componentName]){
				placeholders[componentName] = [];
			}
			if ('' !== componentName){
				var status = placeholder.components[componentName];
				if ('undefined' === typeof status){
					placeholder.components[componentName] = false;
					foundComponents.push(componentName);
					placeholders[componentName].push(placeholder); // (el)
					found++;
				}
				if(false === status){
					inactive++;
				}
			}
		}
		placeholder.$e.attr('component', '');
		placeholder.e.removeAttribute('component');
	});
};


component.appendTo = function(tagName, target, options){ // query required
	target = $(target);
	var e = document.createElement(tagName);
	var $e = $(e);
	$e.appendTo(target);
	return this.replace(e, options); // return instance
};
component.prependTo = function(tagName, target, options){
	target = $(target);
	var e = document.createElement(tagName);
	var $e = $(e);
	$e.prependTo(target);
	return this.replace(e, options); // return instance
};
component.replace = function(domElement, options){ // replace domElement placeholder content with component instance content
	var self = this;
	return getPlaceholder(domElement).replace(self, new self(), options); // return new instance
};
component.instance = function(options){
	var self = this;
	var domElement = document.createElement('div');
	return self.replace(domElement, options);
};
component.update = function(domElement){
	//console.log('component.update', domElement);
	var self = this;
	var found = 0;
	var founda = [];
	component.lookup(domElement);
	//console.log(placeholders);
	for (var componentName in placeholders){
		component.require([componentName], function(foundComponent){
			if (isLoaded(componentName)){ // FIXME MOVE TO COMPONENT DEFINITION
				console.info(componentName, 'loaded at component.update');
				//var foundComponent = loadedComponents[componentName];
				//var el = null;
				while (placeholder = placeholders[componentName].pop()){
					var instance = new foundComponent();
					placeholder.replace(foundComponent, instance, true);
					//replacePlaceholderInstance(placeholder, instance, true);
					component.lookup(placeholder.e); // lookup newly rendered placeholders
					found++;
					founda.push(componentName);
				}
			}
		});
	}
	/*if (found){
		console.log('update found', found, founda);
		self.update();
	}*/
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EVENTS

// ------------------------------------------------------------------- EVENTS

component.init = function(){
	var self = this;
	!self.render || self.render();
	!self.bindScope || self.bindScope();
	!self.service || self.service();
}

$(function(){
	component.update();
	$(window).on('resize', function(){
		component.trigger('resize');
	});
});
