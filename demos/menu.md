---
layout: component
title: Menu
---

Keyboard navigation for menu (UP/DOWN | LEFT/RIGHT)

## Plain HTML

1. Container `ul` MUST be marked as `component="menu"`

```html
<ul component="menu">
	<li><a href="">Menu Item 1</a></li>
	<li><a href="">Menu Item 2</a></li>
	<li><a href="">Menu Item 3</a></li>
	<li><a href="">Menu Item 4</a></li>
	<li><a href="">Menu Item 5</a></li>
</div>
```

## Example

<div class="panel" style="background: #e8e8e8;"><div class="panel-body" id="focus">
<nav style="width: 150px;">
	<ul id="menu-demo" component="menu" class="menu" style="border: solid 1px tomato;">
		<li><a href="javascript::void();">Menu Item 1</a></li>
		<li><a href="javascript::void();">Menu Item 2</a></li>
		<li><a href="javascript::void();">Menu Item 3</a></li>
		<li><a href="javascript::void();">Menu Item 4</a></li>
		<li><a href="javascript::void();">Menu Item 5</a></li>
		<li><a href="javascript::void();">Menu Item 7</a></li>
		<li><a href="javascript::void();">Menu Item 8</a></li>
		<li><a href="javascript::void();">Menu Item 9</a></li>
		<li><a href="javascript::void();">Menu Item 10</a></li>
	</ul>
</nav>
</div></div>

<script>
$(function(){
	$('#focus').click(function(){
		component.query('#menu-demo').focus();
	});
})
</script>
