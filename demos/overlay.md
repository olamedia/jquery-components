---
layout: component
title: Overlay
---

## Personal overlay

```js
var overlay = component('overlay').personal(); // create new instance (appended to body)
overlay.$e; // .append() to this container
overlay.$e.show(); // show overlay
```

## Example

```html
<button class="btn" id="show-overlay">Show overlay</button>
<script>
$(function(){
	var overlay = component('overlay').personal();
	$('#show-overlay').on('click', function(){
		overlay.show();
	});
	var $closeBtn = $('<button class="btn">Hide overlay</button>');
	var $panel = $(document.createElement('div'));
	$panel.css({
		'background': '#fff',
		'padding': '30px',
		'min-height': '400px',
		'max-width': '1000px',
		'margin': '30px auto'
	});
	$panel.append($closeBtn);
	overlay.$e.append($panel);
	$closeBtn.on('click', function(){
		overlay.hide();
	});
});
</script>
```

<button class="btn btn-default" id="show-overlay">Show overlay</button>
<script>
$(function(){
	var overlay = component('overlay').personal();
	$('#show-overlay').on('click', function(){
		overlay.show();
	});
	var $closeBtn = $('<button class="btn btn-default">Hide overlay</button>');
	var $panel = $(document.createElement('div'));
	$panel.css({
		'background': '#fff',
		'padding': '30px',
		'min-height': '400px',
		'max-width': '1000px',
		'margin': '30px auto'
	});
	$panel.append($closeBtn);
	overlay.$e.append($panel);
	$closeBtn.on('click', function(){
		overlay.hide();
	});
});
</script>
