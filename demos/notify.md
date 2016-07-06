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
	component.notify.setSpacing(40);
	component.notify.success('success text');
	component('notify').notify('info text', {
		// class: 'alert-info'
	}, 'info');
	component.notify.warning('warning text');
	component.notify.warn('warn text');
	component.notify.error('error text');
	component.notify.danger('danger text');
});
</script>
```

<script>
$(function(){
	component.notify.setSpacing(40);
	component.notify.success('success text');
	component('notify').notify('info text', {
		// class: 'alert-info'
	}, 'info');
	component.notify.warning('warning text');
	component.notify.warn('warn text');
	component.notify.error('error text');
	component.notify.danger('danger text');
});
</script>
