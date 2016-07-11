---
layout: component
title: Layer
---

Utility for overlay creation

## Example

```js
<script>
$(function(){
	component.require(['layer'], function(layerComponent){
		var layer = layerComponent.instance(); // with unattached div as placeholder
		layer.setPosition('bottom center');
		layer.$e.text('Layer');
		layer.$e.css({
			'background': '#fff',
			'padding': '30px',
			'border': 'dashed 4px #f00'
		});
		console.log('layer', layer);
	});
});
</script>
```

<script>
$(function(){
	component.require(['layer'], function(layerComponent){
		var layer = new layerComponent();
		layer.setPosition('bottom center');
		layer.$e.text('Layer');
		layer.$e.css({
			'background': '#fff',
			'padding': '30px',
			'border': 'dashed 4px #f00'
		});
		console.log('layer', layer);
	});
});
</script>
