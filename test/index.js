var child = require('../')
  , test = require('tape')
  , utils = require('./utils')

test('exports', function(t){
  t.equal(typeof child, 'function', 'a function')
  t.equal(typeof child.binding, 'function', 'binding fn')
  t.end()
})

test('child', function(t){
  var tpl = '<div><p child="book">{title}</p></div>'
    , view = utils.create(tpl)

  t.equal(view.el.innerHTML, '<p>Siddhartha</p>')
  t.end()
})

test('deep', function(t){
  var tpl = '<div><p child="book.metadata">{title}</p></div>'
    , view = utils.create(tpl, true)

  t.equal(view.el.innerHTML, '<p>Siddhartha</p>')
  t.end()
})

test('reactive', function(t){
  var tpl = '<div><p child="book">{title}</p></div>'
    , view = utils.create(tpl)

  view.set('book', utils.model({title: 'Foo'}))
  t.equal(view.el.innerHTML, '<p>Foo</p>')

  view.model.book.set('title', 'Bar')
  t.equal(view.el.innerHTML, '<p>Bar</p>')

  t.end()
})

test('order', function(t){
  var tpl = '<div><a></a><p child="book">{title}</p><a></a></div>'
    , view = utils.create(tpl)
  t.equal(view.el.innerHTML, '<a></a><p>Siddhartha</p><a></a>')
  t.end()
})

test('root node', function(t){
  var tpl = '<p child="book">{title}</p>'
    , view = utils.create(tpl)

  t.equal(view.el.innerHTML, '', 'not on root node')
  t.end()
})
