---
layout: default
title: Style
---

<p>Inline styles</p>
<p>Appending to `style` tag</p>

## Setup

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
	component('style').instance().append('#style-example{padding: 10px; background: tomato;}');
});
</script>

```html
<div id="style-example"></div>
```

```js
component('style').instance().append('#style-example{padding: 10px; background: tomato;}');
```
