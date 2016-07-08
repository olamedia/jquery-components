---
layout: method
title: instance.trigger()
---

Trigger specific event on instance

## instance.trigger(eventName)

Where eventName is event name

## Example

```js
new component('my-component', {
	'service': function(){
		var instance = this;
		setInterval(function(){
			instance.trigger('my-component-tick');
		}, 3000);
	}
});

new component('my-component2', {
	'service': function(){
		var instance = this;
		var myComponentInstance = component('my-component').instance();
		myComponentInstance.on('my-component-tick', function(){
			component.notify.success('myComponentInstance tick');
		});
	}
});
var myComponent2Instance = component('my-component').instance();

```

<script>
new component('my-component', {
	'service': function(){
		var instance = this;
		setInterval(function(){
			instance.trigger('my-component-tick');
		}, 3000);
	}
});

new component('my-component2', {
	'service': function(){
		var instance = this;
		var myComponentInstance = component('my-component').instance();
		myComponentInstance.on('my-component-tick', function(){
			component.notify.success('myComponentInstance tick');
		});
	}
});
var myComponent2Instance = component('my-component').instance();
</script>
