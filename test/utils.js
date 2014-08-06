var Emitter = require('emitter-component')
  , reactive = require('reactive')
  , Adapter = require('reactive/lib/adapter')
  , child = require('../')

exports.model = model

// Simple observable
function model(obj) {
  Emitter(obj)
  obj.set = function(prop, val) {
    this[prop] = val
    this.emit('change '+prop, val)
  }
  return obj
}

exports.create = function(tpl, deep) {
  var m = model({ book: model({ title: 'Siddhartha' })})
  if (deep) m.book = model({ metadata: m.book })

  return reactive(tpl, m, {
    bindings: child(),
    adapter: CustomAdapter
  })
}

// Adapter to test if subscribe works
function CustomAdapter(obj) {
  if (!(this instanceof CustomAdapter))
    return new CustomAdapter(obj)
  this.obj = obj
}

require('inherits')(CustomAdapter, Adapter)

CustomAdapter.prototype.subscribe = function(prop, fn) {
  this.obj.on('change '+prop, fn)
}