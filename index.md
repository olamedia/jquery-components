---
layout: default
title: jquery-components
---

<blockquote class="bg-warning">
<p>Warning: This is a draft, not ready for production</p>
<p>API is not frozen, functions and properties can change names at any time</p>
</blockquote>

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

<div class="panel panel-default">
	<div component="component-codename" class="panel-body">
		<h1>Some placeholder content</h1>
		<p>For search engines and other clients without javascript</p>
	</div>
</div>
<script>
	new component('component-codename', function(){
		var self = this;
		self.$e.before($(document.createElement('div')).addClass('panel-heading').text('Sample text'));
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
	<div class="panel panel-default">
		<div component="component-codename" class="panel-body">
			<h1>Some placeholder content</h1>
			<p>For search engines and other clients without javascript</p>
		</div>
	</div>
	<script src="component.js">
		new component('component-codename', function(){
			var self = this;
			self.$e.before($(document.createElement('div')).addClass('panel-heading').text('Sample text'));
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

<div class="panel panel-default">
	<div component="bind-example" class="panel-body"></div>
</div>
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
<div class="panel panel-default">
	<div component="bind-example" class="panel-body"></div>
</div>
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

<div class="panel panel-default">
	<div component="example-clock" class="panel-body">
		<h1>Some placeholder content</h1>
	</div>
</div>

<script>
new component('example-clock', function(){
	var self = this;
	self.$e.text((new Date()).toTimeString());
}, function(){
	var self = this;
	setInterval(function(){
		self.$e.text((new Date()).toTimeString());
	}, 1000);
});
</script>

```html
<div class="panel panel-default">
	<div component="example-clock" class="panel-body">
		<h1>Some placeholder content</h1>
	</div>
</div>
```

```js
new component('example-clock', function(){
	var self = this;
	self.$e.text((new Date()).toTimeString());
}, function(){
	var self = this;
	setInterval(function(){
		self.$e.text((new Date()).toTimeString());
	}, 1000);
});
```



## License
MIT
