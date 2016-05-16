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

	var $panel = $('<div></div>');
	$panel.css({
		'padding': '30px',
		'min-height': '400px',
		'max-width': '1000px',
		'margin': '0 auto'
	});
	overlay.$e.append($panel);

	$('#show-overlay').on('click', function(){
		overlay.show();
	});
	
	var $closeBtn = $('<button class="btn">Hide overlay</button>');
	$panel.append($closeBtn);

	$closeBtn.on('click', function(){
		overlay.hide();
	});
});
</script>
