---
layout: method
title: .update()
---

* **Use within components**.
* Called automatically on document load.
* Should not be called outside of componets.

## component.update()

Lookup for tags with `component=""` attribute, replace with component if exists.

## component.update(DOMElement)

Same as `component.update()`, but lookup is partial, only inside of DOMElement.
