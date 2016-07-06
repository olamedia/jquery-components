---
layout: default-custom-h1
title: jQuery components
---

<div class="jumbotron" style="padding: 0; padding-top: 30px; background: #fff; background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 10%,rgba(255,255,255,1) 96%,rgba(255,255,255,1) 100%) top left repeat-x, linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0.85) 28%,rgba(255,255,255,0.7) 53%,rgba(255,255,255,0.85) 87%,rgba(255,255,255,1) 100%) left top repeat-x, url({{ site.baseurl }}/css/images/hero-bg.png) left top repeat;">
	<h1>jQuery components</h1>
	<p>Component-based application framework. Plain javascript. Without templates.<br />
	Designed for Progressive Enhancement.</p>
</div>

<blockquote class="bg-warning" style="border-left-color: #aa6708;">
<h4 style="color: #aa6708;">Warning: This is a draft, not ready for production</h4>
<p><code>gh-pages</code> and <code>master</code> branches have different script versions at the moment.</p>
<p>Do not expect demos working with <code>master</code> branch.</p>
<p>API is not frozen, functions and properties can change names at any time</p>
</blockquote>

## TODO

* ? Access to parent/child scope, object as a value
* ? Component router with History support
* Nested components - IMPLEMENTED
* Multiple components on a same DOMElement - IMPLEMENTED
* ?
* ...

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
	'extend': function(){
		// modify/extend component class before creating first instance
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
