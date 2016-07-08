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
	'render': function(){
		var instance = this;
		// ...
		instance.trigger('my-component-loaded');
	}
});

new component('my-component2', {
	'render': function(){
		var instance = this;
		// ...
		var myComponentInstance = component('my-component').instance();
		// ...
		// var $e = $(document.createElement('div'));
		// component.replace($e[0], myComponentInstance, true)
		// ...
		myComponentInstance.on('my-component-loaded', function(){
				component.notify.success('myComponentInstance loaded');
		});
	}
});

```

<script>
new component('my-component', {
	'render': function(){
		var instance = this;
		// ...
		instance.trigger('my-component-loaded');
	}
});

new component('my-component2', {
	'render': function(){
		var instance = this;
		// ...
		var myComponentInstance = component('my-component').instance();
		// ...
		// var $e = $(document.createElement('div'));
		// component.replace($e[0], myComponentInstance, true)
		// ...
		myComponentInstance.on('my-component-loaded', function(){
			component.notify.success('myComponentInstance loaded');
		});
	}
});
</script>
