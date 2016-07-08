---
layout: method
title: instance.service()
---

## Use cases

* Standard way to schedule component's internal tasks
* SHOULD NOT be called directly if component will be rendered.
* Called automatically after setting `instance.render()`

## Example


<div class="panel panel-default">
	<div component="component-codename" class="panel-body">
		<h1>Some placeholder content</h1>
	</div>
</div>
<script>
	new component('component-codename', function(){
		// render()
	}, function(){
		// service()
		var self = this;
		var i = 0;
		setInterval(function(){
			self.$e.text(i++);
		}, 1000);
	});
</script>

```html
<body>
	<div class="panel panel-default">
		<div component="component-codename" class="panel-body">
			<h1>Some placeholder content</h1>
		</div>
	</div>
	<script>
		new component('component-codename', function(){
			// render()
		}, function(){
			// service()
			var self = this;
			var i = 0;
			setInterval(function(){
				self.$e.text(i++);
			}, 1000);
		});
	</script>
</body>
```

<div class="panel panel-default">
	<div component="component-codename2" class="panel-body">
		<h1>Some placeholder content</h1>
	</div>
</div>
<script>
	new component('component-codename2', {
		'service': function(){
			var self = this;
			var i = 0;
			setInterval(function(){
				self.$e.text(i++);
			}, 1000);
		}
	});
</script>

```html

	<div class="panel panel-default">
		<div component="component-codename2" class="panel-body">
			<h1>Some placeholder content</h1>
		</div>
	</div>
	<script>
		new component('component-codename2', {
			'render': function(){

			},
			'service': function(){
				var self = this;
				var i = 0;
				setInterval(function(){
					self.$e.text(i++);
				}, 1000);
			}
		});
	</script>

```
