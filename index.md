---
layout: default
title: jquery-components
---

> Warning: This is a draft, not ready for production
>
> API is not frozen, functions and properties can change names at any time

## Component definition

new component(String codename, Function render[, Function service])

```js
new component('component-codename', function(){
	// "render": create basic template
	var self = this; // "this" points to component instance
}, function(){
	// "service": deferred updates (ajax, setInterval, etc)
});
```

## Alternative (extended) component definition

new component(String codename, Object definition)

```js
new component('component-codename', {
	'componentConstruct': function(){
		// modify component class before creating first instance
		var self = this; // "this" points to component class
	},
	'render': function(){
		// create basic template
		var self = this; // "this" points to component instance
	},
	'service': function(){
		// deferred updates (ajax, setInterval, etc)
	}
});
```

### Component lifecycle
- `component.instance()` is called - to clone component with unique id and scope
- `DOMElement` is passed to `component.e` & `component.$e`
- `component.render()` is called
- `[model=*]` bindings are applied
- `component.service()` is called.


## Placing component into HTML page

<div component="component-codename">
	<h1>Some placeholder content</h1>
	<p>For search engines and other clients without javascript</p>
</div>
<script>
	new component('component-codename', function(){
		var self = this;
		self.$e.after($(document.createElement('div')).text('Sample text'));
	}, function(){
		var self = this;
		var i = 0;
		setInterval(function(){
			// simple example
			self.$e.text(i++);
		}, 1000);
	});
</script>

```html
<body>
	<div component="component-codename">
		<h1>Some placeholder content</h1>
		<p>For search engines and other clients without javascript</p>
	</div>
	<script src="component.js">
		new component('component-codename', function(){
			var self = this;
			self.$e.after($(document.createElement('div')).text('Sample text'));
		}, function(){
			var self = this;
			var i = 0;
			setInterval(function(){
				// simple example
				self.$e.text(i++);
			}, 1000);
		});
	</script>
</body>
```

## Binding

<div component="bind-example"></div>
<script>
	new component('bind-example', function(){
		var self = this;
		self.$e.html('<span model="alice"></span> <span model="bob"></span>');
		self.scope.alice = 'Alice';
		self.scope.bob = 'Bob';
		// Here you can set initial values for self.scope
		// self.sync() will do nothing since values are still detached from DOM
	}, function(){
		var self = this;
		setInterval(function(){
			// swap values every second
			[self.scope.alice, self.scope.bob] = [self.scope.bob, self.scope.alice];
			// Here you MUST call `self.sync()` every time after modifying `self.scope`
			// (after receiving data via ajax and setting scope variables, for example).
			self.sync();
		}, 1000);
	})
</script>

```html
<div component="bind-example"></div>
```

```js
new component('bind-example', function(){
	var self = this;
	self.$e.html('<span model="alice"></span> <span model="bob"></span>');
	self.scope.alice = 'Alice';
	self.scope.bob = 'Bob';
	// Here you can set initial values for self.scope
	// self.sync() will do nothing since values are still detached from DOM
}, function(){
	var self = this;
	setInterval(function(){
		// swap values every second
		[self.scope.alice, self.scope.bob] = [self.scope.bob, self.scope.alice];
		// Here you MUST call `self.sync()` every time after modifying `self.scope`
		// (after receiving data via ajax and setting scope variables, for example).
		self.sync();
	}, 1000);
})
```


## Clock Example
```html
<body>
	<div component="example-clock">
		<h1>Some placeholder content</h1>
		<p>For search engines and other clients without javascript</p>
		<p>Probably, some links to the corresponding website section</p>
	</div>
	<script src="component.js">
		(function(){
			new component('example-clock', function(){
				var self = this;
				self.text((new Date()).toTimeString());
			}, function(){
				var self = this;
				setInterval(function(){
					self.text((new Date()).toTimeString());
				}, 1000);
			});
		})();
	</script>
</body>
```



## License
MIT
