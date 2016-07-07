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
.articleSlider-text, .articleSlider-text h3{
	color: #fff;
}
.articleSlider-text{
	background: rgba(0,0,0,0.8);
	padding: 10px 30px;
}
</style>
<div component="articleSlider" class="articleSlider">
	<div class="articleSlider-slide" style="background: #F44336;">
		<div class="articleSlider-media">
			<img src="http://placehold.it/350x150" />
		</div>
		<div class="articleSlider-text">
			<h3>Article 1</h3>
			<p>Article text article text. Article text article text.</p>
		</div>
	</div>
	<div class="articleSlider-slide" style="background: #9C27B0;">
		<div class="articleSlider-media">
			<img src="http://placehold.it/350x150" />
		</div>
		<div class="articleSlider-text">
			<h3>Article 1</h3>
			<p>Article text article text. Article text article text.</p>
		</div>
	</div>
	<div class="articleSlider-slide" style="background: #3F51B5;">
		<div class="articleSlider-media">
			<img src="http://placehold.it/350x150" />
		</div>
		<div class="articleSlider-text">
			<h3>Article 1</h3>
			<p>Article text article text. Article text article text.</p>
		</div>
	</div>
	<div class="articleSlider-slide" style="background: #009688;">
		<div class="articleSlider-media">
			<img src="http://placehold.it/350x150" />
		</div>
		<div class="articleSlider-text">
			<h3>Article 1</h3>
			<p>Article text article text. Article text article text.</p>
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
				<h1 style="color: #fff;">Article 1</h1>
				<p>Article text article text. Article text article text.</p>
			</div>
		</div>
		<div style="background: #9C27B0; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Article 1</h1>
				<p>Article text article text. Article text article text.</p>
			</div>
		</div>
		<div style="background: #3F51B5; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Article 1</h1>
				<p>Article text article text. Article text article text.</p>
			</div>
		</div>
		<div style="background: #009688; padding: 30px 60px; border: solid 4px #333;">
			<div articleSlider-media>
				<img src="http://placehold.it/350x150" style="object-fit: cover;" />
			</div>
			<div articleSlider-text>
				<h1 style="color: #fff;">Article 1</h1>
				<p>Article text article text. Article text article text.</p>
			</div>
		</div>
	</div>
```
