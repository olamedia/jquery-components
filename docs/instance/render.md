---
layout: method
title: instance.render()
---

## Use cases

* Standard way to set component's internal HTML
* SHOULD NOT be called directly
* Called automatically after setting `instance.e` && `instance.$e`

## Example

<div class="panel panel-default">
	<div component="my-component" class="panel-body"></div>
</div>
<div class="panel panel-default">
	<div component="my-component2" class="panel-body"></div>
</div>
<script>
new component('my-component', function(){
	this.$e.text('my-component');
})
new component('my-component2', {
	'render': function(){
		this.$e.text('my-component2');
	}
});
</script>

```html
<div class="panel panel-default">
	<div component="my-component" class="panel-body"></div>
</div>
<div class="panel panel-default">
	<div component="my-component2" class="panel-body"></div>
</div>
<script>
new component('my-component', function(){
	this.$e.text('my-component');
})
new component('my-component2', {
	'render': function(){
		this.$e.text('my-component2');
	}
});
</script>
```
