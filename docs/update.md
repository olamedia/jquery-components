---
layout: method
title: .update()
---

Initialize new components

## Use case

If component contains another components or loads html which can have them - use this method to **initialize** those **components after changing html**.

### Example

```js
var $e = $('#my-div');
$.get(url, function(data){
	$e.append(data);
	component.update($e); // do not check whole document, only $e
})
```

* **Use within components**.
* Called automatically on document load.
* Should not be called outside of components.

## component.update()

Lookup for tags with `component=""` attribute, replace with component if exists.

## component.update(DOMElement)

Same as `component.update()`, but lookup is partial, only inside of DOMElement.
