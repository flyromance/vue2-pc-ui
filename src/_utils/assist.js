// 向上找到最近的指定父组件
function findComponentUpward(vm, cName) {
  let parent = vm.$parent
  while (parent) {
    let name = parent.$options.name
    if (!name || cName.indexOf(name) < 0) {
      parent = parent.$parent
    } else {
      break
    }
  }
  return parent
}

// 向上找到所有指定的父组件
function findComponentsUpward(vm, cName) {
  let comps = []
  let parent = vm.$parent

  while (parent) {
    let name = parent.$options.name
    if (cName.indexOf(name) > -1) {
      comps.push(parent)
    }
    parent = parent.$parent
  }

  return comps.length ? comps : null
}

// 向下找到最近的指定的子组件
function findComponentDownward(vm, cName) {
  let children = vm.$children
  let ret = null

  if (children && children.length) {
    for (let child of children) {
      let name = child.$options.name
      if (cName.indexOf(name) > -1) {
        ret = child
        break
      }
    }
    if (!ret) {
      for (let child of children) {
        ret = findComponentDownward(child, cName)
        if (ret) break
      }
    }
  }

  return ret
}

// 向下找到所有的指定的子组件
function findComponentsDownward(vm, cName) {
  let children = vm.$children
  let ret = []

  if (children && children.length) {
    for (let child of children) {
      let name = child.$options.name
      if (cName.indexOf(name) > -1) {
        ret.push(child)
      }
      ret = ret.concat(findComponentsDownward(child, cName))
    }
  }

  return ret.length ? ret : null
}

// 找到指定的兄弟组件
function findComponentsAdjacent(vm, cName, includeMe = false) {
  let parent = vm.$parent
  if (!parent) return null

  let brothers = parent.$children
  if (!brothers || !brothers.length) return null

  let ret = []
  for (let brother of brothers) {
    if (cName === brother.$options.name && (vm !== brother || includeMe)) {
      ret.push(brother)
    }
  }

  return ret.length ? ret : null
}

function oneOf(val, arr = []) {
  return arr.indexOf(val) > -1
}

function hasClass(el, cls) {
  try {
    return el.classList.contains(cls)
  } catch (e) {
    return
  }
}

function addClass(el, cls) {
  if (!el) return
  try {
    el.classList.add(cls)
  } catch (e) {
    let className = el.className
    if (!hasClass(el, cls)) {
      el.className = className + ' ' + cls
    }
  }
}

function removeClass(el, cls) {
  try {
    el.classList.remove(cls)
  } catch (e) {}
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findComponentsAdjacent,
  oneOf,
  hasClass,
  addClass,
  removeClass
}
