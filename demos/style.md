---
layout: component
title: Style
---

Inline styles

Appending to `style` tag

## Plain HTML

```html
<head>
	<!-- ... -->
	<style component="style"></style>
	<!-- ... -->
</head>
```

## Example

<div id="style-example"></div>
<script>
$(function(){
	component.require(['style'], function(style){
		style.append('#style-example{padding: 10px; background: tomato;}');
	});
});
</script>

```html
<div id="style-example"></div>
```

```js
$(function(){
	component.require(['style'], function(style){
		style.append('#style-example{padding: 10px; background: tomato;}');
	});
});
```
