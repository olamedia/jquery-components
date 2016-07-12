---
layout: component
title: Drawer
---

## TODO

* <del>Fix right drawer behaviour with body scroll</del>
* Fix body scroll behaviour when drawers are opened together

## Example

<button class="btn btn-default" id="show-drawer-left">Show left drawer</button>
<button class="btn btn-default" id="show-drawer-right">Show right drawer</button>
<script>
$(function(){
	component.require(['drawer'], function(drawerComponent){
		var attachDrawer = function(selector){
			var drawer = drawerComponent.detached();
			var $closeBtn = $(document.createElement('button')).text('Close drawer');
			$closeBtn.on('click', function(e){
				drawer.close();
			});
			drawer.append($closeBtn);
			$(selector).on('click', function(e){
				drawer.open();
				e.stopPropagation(); // prevent body click (it will close drawer)
			});
			return drawer;
		}
		var leftDrawer = attachDrawer('#show-drawer-left');
		leftDrawer.left();
		var rightDrawer = attachDrawer('#show-drawer-right');
		rightDrawer.right();
	});
});
</script>

```html
<button class="btn btn-default" id="show-drawer-left">Show left drawer</button>
<button class="btn btn-default" id="show-drawer-right">Show right drawer</button>
```

```js
$(function(){
	component.require(['drawer'], function(drawerComponent){
		var attachDrawer = function(selector){
			var drawer = drawerComponent.detached();
			var $closeBtn = $(document.createElement('button')).text('Close drawer');
			$closeBtn.on('click', function(e){
				drawer.close();
			});
			drawer.append($closeBtn);
			$(selector).on('click', function(e){
				drawer.open();
				e.stopPropagation(); // prevent body click (it will close drawer)
			});
			return drawer;
		}
		var leftDrawer = attachDrawer('#show-drawer-left');
		leftDrawer.left();
		var rightDrawer = attachDrawer('#show-drawer-right');
		rightDrawer.right();
	});
});
```
