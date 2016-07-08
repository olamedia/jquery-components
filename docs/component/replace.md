---
layout: method
title: component.replace()
---

## component.replace(DOMElement, classOrInstance, isInstance)

Initialize component on specific DOMElement.

## Example

```html
<div class="panel">
	<div id="myDiv" class="panel-body"></div>
</div>

<script>
$(function(){
	new component('my-component', {
		'render': function(){
			this.$e.text('Rendered');
		}
	})

	var myComponentInstance = component('my-component').instance();

	component.replace($('#myDiv')[0], myComponentInstance, true);
});
</script>
```

<div class="panel">
	<div id="myDiv" class="panel-body"></div>
</div>

<script>
$(function(){
	new component('my-component', {
		'render': function(){
			this.$e.text('Rendered');
		}
	})

	var myComponentInstance = component('my-component').instance();

	component.replace($('#myDiv')[0], myComponentInstance, true);
});
</script>
