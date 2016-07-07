---
layout: component
title: Scrollbar
---

Custom scrollbar

## Example

<style>
	.scrollbar{
		background: #f1f1f1;
		border-radius: 4px;
	}
	.scrollbar>.bar{
		background: #909190;
		border-radius: 4px;
		height: 100px;
		border: solid 1px #6D6D6D;
	}
	.scrollbar-vertical{
		width: 8px;
		height: 100%;
	}
</style>
<div component="scrollbar" style="width: 600px; height: 300px; border: solid 4px #222; background: #444; overflow-y: scroll;">
  <div style="width: 100%; height: 2000px; background: #cb60b3; background: linear-gradient(to bottom, #cb60b3 0%,#c146a1 50%,#a80077 51%,#db36a4 100%); border: solid 4px #f00;">
    <img src="../images/sample/2.jpg" style="object-fit: cover; width: 100%; height: 100%;" />
  </div>
</div>
