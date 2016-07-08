---
layout: method
title: instance.on()
---

Register listener for specific events

## instance.on(eventName, listener)

Where eventName is event name, such as 'resize', and listener is a function

## Example

```js
new component('my-component', {
	'render': function(){
		var instance = this;
		instance.on('resize', function(event){
			// window was resized, recalculate internal sizes
		});
	}
})
```
