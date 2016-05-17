---
layout: component
title: Drawer
---

<button class="btn btn-default" id="show-drawer-left">Show left drawer</button>
<button class="btn btn-default" id="show-drawer-right">Show right drawer</button>
<script>
$(function(){
	var attachDrawer = function(selector){
		var drawer = component('drawer').detached();
		var $closeBtn = $(document.createElement('button')).text('Close drawer');
		$closeBtn.on('click', function(){
			drawer.close();
		});
		drawer.append($closeBtn);
		$(selector).on('click', function(){
			drawer.open();
		});
		return drawer;
	}
	var leftDrawer = attachDrawer('#show-drawer-left');
	leftDrawer.left();
	var rightDrawer = attachDrawer('#show-drawer-right');
	rightDrawer.right();
});
</script>
