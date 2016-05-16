---
layout: default
title: Style
---

Inline styles

Appending to `style` tag

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
