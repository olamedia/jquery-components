---
layout: component
title: Drawer
---

<button class="btn btn-default" id="show-drawer">Show drawer</button>
<script>
$(function(){
	var drawer = component('drawer').detached();
	$('#show-drawer').on('click', function(){
		drawer.open();
	});
});
</script>
