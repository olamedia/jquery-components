---
layout: component
title: Drawer
---

<button class="btn btn-default" id="show-drawer">Show drawer</button>
<script>
$(function(){
	var drawer = component('drawer').detached();
	var $closeBtn = $(document.createElement('button')).text('Close drawer');
	$closeBtn.on('click', function(){
		drawer.close();
	});
	drawer.$e.append($closeBtn);
	$('#show-drawer').on('click', function(){
		drawer.open();
	});
});
</script>
