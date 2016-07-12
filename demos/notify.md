---
layout: component
title: Notify
---

Bootstrap alert based notifications

## Required components

* layer

## Example

<script>
$(function(){
	component.require(['layer','notify'], function(notify){
		console.log('LAYER, NOTIFY');
		/*notify.setSpacing(40);
		notify.success('success text');
		notify.notify('info text', {
			// class: 'alert-info'
		}, 'info');
		notify.warning('warning text');
		notify.warn('warn text');
		notify.error('error text');
		notify.danger('danger text');*/
	});
});
</script>
