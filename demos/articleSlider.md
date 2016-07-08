---
layout: component
title: Article Slider
---

Very basic article slider

## Example

<style>
.articleSlider{
	border: solid 4px #689F38;
	background: #f00;
}
.articleSlider-slide{
	height: 400px;
	position: relative;
	border: solid 4px #333;
}
.articleSlider-media{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
}
.articleSlider-media img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.articleSlider-headers{
	background: #fff;
	border-left: solid 4px #222;
}
.articleSlider-header, .articleSlider-header h3{
	color: #fff;
}
.articleSlider-slide .articleSlider-header{
	background: rgba(0,0,0,0.8);
	padding: 10px 30px;
	position: absolute;
    bottom: 0;
    width: 100%;
}
.articleSlider-headers .articleSlider-header{
	background: #444;
	overflow: hidden;
	padding: 0 10px;
	transition: background-color 1s;
}
.articleSlider-headers .articleSlider-header-selected{
	background: #222;
	transition: background-color 1s;
}
</style>
<div component="articleSlider" articleSlider-navigation="prev,next" class="articleSlider">
	<div style="background: #F44336;">
		<div class="articleSlider-media">
			<img src="../images/sample/4.jpg" />
		</div>
		<div articleSlider-header>
			<h3>Google's Now on Tap can translate any text on your Android screen</h3>
			<p>Google sure took its own sweet time bringing its Now on Tap feature to Android Marshmallow, which surfaces contextual information based on ...</p>
		</div>
	</div>
	<div style="background: #9C27B0;">
		<div>
			<img src="../images/sample/1.jpg" />
		</div>
		<div articleSlider-header>
			<h3>Google is reportedly working on its own Android Wear smartwatches</h3>
			<p>Google is reportedly working on two Android Wear smartwatches, according to a new report from Android Police. Such a move would mark yet ...</p>
		</div>
	</div>
	<div style="background: #3F51B5;">
		<div>
			<img src="../images/sample/2.jpg" />
		</div>
		<div articleSlider-header>
			<h3>Google Now weather card has been improved with detailed hourly ...</h3>
			<p>Google Now's new weather card was spotted at the beginning of January then officially announced later that month. Ever since, it has been ...</p>
		</div>
	</div>
	<div style="background: #009688;">
		<div>
			<img src="../images/sample/3.jpg" />
		</div>
		<div articleSlider-header>
			<h3>Google launches a more scalable and robust Kubernetes</h3>
			<p>Google today announced the next version of Kubernetes, its open source orchestration service for deploying, scaling and managing software ...</p>
		</div>
	</div>
</div>

```html
	<div component="articleSlider" style="border: solid 4px #689F38; background: #f00;">
		<div style="background: #F44336; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Google's Now on Tap can translate any text on your Android screen</h1>
				<p>Google sure took its own sweet time bringing its Now on Tap feature to Android Marshmallow, which surfaces contextual information based on ...</p>
			</div>
		</div>
		<div style="background: #9C27B0; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Google is reportedly working on its own Android Wear smartwatches</h1>
				<p>Google is reportedly working on two Android Wear smartwatches, according to a new report from Android Police. Such a move would mark yet ...</p>
			</div>
		</div>
		<div style="background: #3F51B5; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Google Now weather card has been improved with detailed hourly ...</h1>
				<p>Google Now's new weather card was spotted at the beginning of January then officially announced later that month. Ever since, it has been ...</p>
			</div>
		</div>
		<div style="background: #009688; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Google launches a more scalable and robust Kubernetes</h1>
				<p>Google today announced the next version of Kubernetes, its open source orchestration service for deploying, scaling and managing software ...</p>
			</div>
		</div>
	</div>
```
