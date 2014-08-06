module.exports = child

function child (bindings) {
  bindings || (bindings = {})
  bindings['child'] = child.binding
  return bindings
}

child.binding = function(el, prop) {
  // No sense in doing this on root node
  if (el===this.reactive.el) return

  this.skip = true

  var parent = el.parentNode
    , placeholder = document.createTextNode('')
    , reactive = this.reactive
    , view

  // No recursion
  el.removeAttribute(this.name)

  // Use placeholder to remember position
  parent.replaceChild(placeholder, el)

  // Subscribe to updates
  reactive.sub(prop, update)

  // Initial value
  update()

  function update(){
    var model  = reactive.get(prop)
      , clone  = el.cloneNode(true)
      , constr = reactive.constructor

    // Destroy old view
    view && view.destroy()

    // Create new view
    view = constr(clone, model, {
      delegate: reactive.view,
      adapter: reactive.opt.adapter,
      bindings: reactive.bindings
    })

    parent.insertBefore(view.el, placeholder)
  }
}
