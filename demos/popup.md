---
layout: component
title: Popup
---


## Basics

* Without javascript, popup css styles are not applied, panel is shown
* With javascript enabled, panel becomes hidden, additional styling applied

```html
<div component="popup">
	<a popup-trigger href="/no-script-url">Dropdown </a>
	<div popup-panel>
		Panel content
	</div>
</div>
```

<nav style="width: 300px;">
	<ul class="menu">
		<li><a href="">Menu Item 1</a></li>
		<li><a href="">Menu Item 2</a></li>
		<li><a href="">Menu Item 3</a></li>
		<li><a href="">Menu Item 4</a></li>
		<li><a href="">Menu Item 5</a></li>
		<li component="popup">
			<a popup-trigger href="" class="btn btn-default">Menu Item 6</a>
			<ul popup-panel class="menu menu-default menu-vertical">
				<li><a href="">Submenu Item 1</a></li>
				<li><a href="">Submenu Item 2</a></li>
				<li><a href="">Submenu Item 3</a></li>
				<li><a href="">Submenu Item 4</a></li>
				<li class="active"><a href="">Submenu Item 5</a></li>
				<li><a href="">Submenu Item 6</a></li>
				<li><a href="">Submenu Item 8</a></li>
				<li><a href="">Submenu Item 9</a></li>
				<li><a href="">Submenu Item 10</a></li>
			</ul>
		</li>
		<li><a href="">Menu Item 7</a></li>
		<li><a href="">Menu Item 8</a></li>
		<li><a href="">Menu Item 9</a></li>
		<li><a href="">Menu Item 10</a></li>
	</ul>
</nav>

<div>
	Inline <span component="popup">
		<a popup-trigger="" href="" class="btn btn-default">popup</a>
		<div popup-panel="" class="popup-panel">
			<div class="popup-column">
				<h3>Panel</h3>
				<img src="thumb.jpg" />
			</div>
			<ul popup-panel class="popup-column menu menu-default menu-vertical">
				<li><a href="">Submenu Item 1</a></li>
				<li><a href="">Submenu Item 2</a></li>
				<li><a href="">Submenu Item 3</a></li>
				<li class="menu-separator"></li>
				<li><a href="">Submenu Item 4</a></li>
				<li class="active"><a href="">Submenu Item 5</a></li>
				<li><a href="">Submenu Item 6</a></li>
				<li><a href="">Submenu Item 8</a></li>
				<li><a href="">Submenu Item 9</a></li>
				<li><a href="">Submenu Item 10</a></li>
			</ul>
			<div class="popup-separator"></div>
			<div class="popup-column">
				body
			</div>
		</div>
	</span> example
</div>
