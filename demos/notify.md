---
layout: component
title: Notify
---

Bootstrap alert based notifications

## Required components

* layer

## Example

```js
<script>
$(function(){
	component.require(['notify'], function(notify){
		notify.setSpacing(40);
		notify.success('success text');
		notify.notify('info text', {
			// class: 'alert-info'
		}, 'info');
		notify.warning('warning text');
		notify.warn('warn text');
		notify.error('error text');
		notify.danger('danger text');
	});
});
</script>
```

<script>
$(function(){
	component.require(['notify'], function(notify){
		console.log('notify loaded');
		notify.setSpacing(40);
		notify.success('success text');
		notify.notify('info text', {
			// class: 'alert-info'
		}, 'info');
		notify.warning('warning text');
		notify.warn('warn text');
		notify.error('error text');
		notify.danger('danger text');
	});
});
</script>
