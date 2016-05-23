---
layout: method
title: .update()
---

## Use case

If component contains another components or loads html which can have them - use this method to initialize those components.

* **Use within components**.
* Called automatically on document load.
* Should not be called outside of components.

## component.update()

Lookup for tags with `component=""` attribute, replace with component if exists.

## component.update(DOMElement)

Same as `component.update()`, but lookup is partial, only inside of DOMElement.
