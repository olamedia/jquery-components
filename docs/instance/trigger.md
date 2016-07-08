---
layout: method
title: instance.trigger()
---

Trigger specific event on instance

## instance.trigger(eventName)

Where eventName is event name

## Example

```js
$(function(){
	new component('my-component', {
		'service': function(){
			console.log('my-component instance service()');
			var instance = this;
			setInterval(function(){
				instance.trigger('my-component-tick');
			}, 3000);
		}
	});

	new component('my-component2', {
		'service': function(){
			console.log('my-component2 instance service()');
			var instance = this;
			var myComponentInstance = component('my-component').instance();
			myComponentInstance.on('my-component-tick', function(){
				component.notify.success('myComponentInstance tick');
			});
			myComponentInstance.service();
		}
	});
	var myComponent2Instance = component('my-component2').instance();
	myComponent2Instance.service();
});
```

<script>
$(function(){
	new component('my-component', {
		'service': function(){
			console.log('my-component instance service()');
			var instance = this;
			setInterval(function(){
				instance.trigger('my-component-tick');
			}, 3000);
		}
	});

	new component('my-component2', {
		'service': function(){
			console.log('my-component2 instance service()');
			var instance = this;
			var myComponentInstance = component('my-component').instance();
			myComponentInstance.on('my-component-tick', function(){
				component.notify.success('myComponentInstance tick');
			});
			myComponentInstance.service();
		}
	});
	var myComponent2Instance = component('my-component2').instance();
	myComponent2Instance.service();
});
</script>
