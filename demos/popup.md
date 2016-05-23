---
layout: component
title: Popup
---


## Plain HTML

1. Container MUST be marked as `component="popup"`
2. Button or other trigger MUST be marked with `popup-trigger` attribute.
3. Popup panel MUST be marked with `popup-panel` attribute.
4. In case of menu, `popup-panel` SHOULD be used with `class="menu"`
5. In case of regular panel, `popup-panel` SHOULD be used with `class="popup-panel"`

```html
<div component="popup append-text" append-text="sample">
	<a popup-trigger href="/no-script-url">Dropdown </a>
	<div popup-panel>
		Panel content
	</div>
</div>
```

## Menu example

<nav style="width: 150px;">
	<ul class="menu">
		<li><a href="">Menu Item 1</a></li>
		<li><a href="">Menu Item 2</a></li>
		<li><a href="">Menu Item 3</a></li>
		<li><a href="">Menu Item 4</a></li>
		<li><a href="">Menu Item 5</a></li>
		<li component="popup">
			<a popup-trigger href="" class="btn btn-default">Menu Item 6</a>
			<ul popup-panel class="menu menu-default">
				<li><a href="">Submenu Item 1</a></li>
				<li class="active"><a href="">Submenu Item 2</a></li>
				<li><a href="">Submenu Item 3</a></li>
				<li><a href="">Submenu Item 4</a></li>
				<li component="popup">
					<a popup-trigger href="">Submenu Item 5</a>
					<ul popup-panel class="menu menu-default">
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

## Inline example

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
