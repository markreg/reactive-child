# reactive-child

[![Build Status](https://travis-ci.org/vweevers/reactive-child.svg)](https://travis-ci.org/vweevers/reactive-child) [![NPM](https://badge.fury.io/js/reactive-child.svg)](https://www.npmjs.org/package/reactive-child) ![dependencies](https://david-dm.org/vweevers/reactive-child.png)

Plugin for [reactive](https://github.com/component/reactive) to create child views for properties. Adds a `child` binding.

## Usage

`child([bindings])` - Extend `bindings` or create a 
new bindings object.

```html
<section>
  <article child="book.metadata">
    <h1>{title} by {author}</h1>
  </article>
</section>
```

```js
var reactive = require('reactive')
  , child = require('reactive-child')

var model = { 
  book: { 
    metadata: {
      title: 'Siddhartha', 
      author: 'Hermann Hesse'
    }
  }
}

reactive(template, model, {
  bindings: child()
})
```

Or if you want a different binding name:

```js
reactive(template, model, {
  bindings: { 'model': child.binding } 
})
```

Note that the element itself becomes the root node of the child view:

```html
<article child="book.metadata" data-title="{title}"></article>
```

## Install

    npm i reactive-child

Then bundle for the browser with [browserify](http://browserify.org/).

## License

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl)
