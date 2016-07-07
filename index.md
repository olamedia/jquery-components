---
layout: default-custom-h1
title: jQuery components
---

<div class="jumbotron" style="padding: 0; margin-top: 30px; background: #fff; background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 10%,rgba(255,255,255,1) 96%,rgba(255,255,255,1) 100%) top left repeat-x, linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0.85) 28%,rgba(255,255,255,0.7) 53%,rgba(255,255,255,0.85) 87%,rgba(255,255,255,1) 100%) left top repeat-x, url({{ site.baseurl }}/css/images/hero-bg.png) left top repeat;">
	<div>
		<h1>jQuery components</h1>
		<div component="slider" slider-vertical>
			<p>Component-based application framework.</p>
			<p>Not bound to any template language.</p>
			<p>Designed for Progressive Enhancement.</p>
		</div>
	</div>
</div>

<blockquote class="bg-warning" style="border-left-color: #aa6708;">
<h4 style="color: #aa6708;">Warning: This is a draft, not ready for production</h4>
<p><code>gh-pages</code> and <code>master</code> branches have different script versions at the moment.</p>
<p>Do not expect demos working with <code>master</code> branch.</p>
<p>API is not frozen, functions and properties can change names at any time</p>
</blockquote>

## Features

* Not bound to any template language. Use plain JavaScript if you want, or load preferred one.
* Designed for Progressive Enhancement.Components are extending or replacing existing HTML code, which is useful for clients without JavaScript, such as crawlers (SEO), browsers with no or disabled support and other bots.
* Components can be initialized with JavaScript only and do not require pre-existing HTML code on a page.
* Components can be built as services and do not require creation of any HTML code.
* Nested components. Components can initialize all known application components withing itself, without knowledge of their specific names. Useful when loading rich content withing itself (for example, for modal window component).
* Multiple components on a same DOMElement. This allows compact HTML code.
* Components can be extended at runtime: replace 'extend' method with own code. For example, component can be made singleton by replacing 'instance' method.


## TODO

* ? Access to parent/child scope, object as a value
* ? Component router with History support
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
