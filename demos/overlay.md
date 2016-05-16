---
layout: default
title: Overlay
---

## Personal overlay

```js
var overlay = component('overlay').personal(); // create new instance (appended to body)
overlay.$e; // .append() to this container
overlay.$e.show(); // show overlay
```

## Example

```js

```

<button class="btn" id="show-overlay">Show overlay</button>
<script>
$(function(){
	var overlay = component('overlay').personal();
	$('#show-overlay').on('click', function(){
		overlay.show();
	});
	$('body').on('click', function(){
		overlay.hide();
	});
});
</script>
