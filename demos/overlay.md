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

<script>
var overlay = component('overlay').personal();
$('body').on('click', function(){
	overlay.toggle();
});


</script>
