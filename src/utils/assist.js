// 向上找到最近的指定父组件
function findComponentUpward(context, compName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || compName.indexOf(name) < 0)) {
    parent = parent.$parent;
    name = parent.$options.name;
  }
  return parent;
}

// 向上找到所有指定的父组件
function findComponentsUpward(context, compName) {
  let comps = [];
  let parent = context.$parent;

  while (parent) {
    let name = parent.$options.name;
    if (compName.indexOf(name) > -1) {
      comps.push(parent);
    }
    parent = parent.$parent;
  }

  return comps;
}

// 向下找到最近的指定的子组件
function findComponentDownward(context, compName) {
  let children = context.$children;
  let ret = null;

  if (children && children.length) {
    for (let child of children) {
      let name = child.$options.name;
      if (compName.indexOf(name) > -1) {
        ret = child;
        break;
      }
    }
    if (!ret) {
      for (let child of children) {
        ret = findComponentDownward(child, compName);
        if (ret) break;
      }
    }
  }

  return ret;
}

// 向下找到所有的指定的子组件
function findComponentsDownward(context, compName) {
  let children = context.$children;
  let ret = [];

  if (children && children.length) {
    for (let child of children) {
      let name = child.$options.name;
      if (compName.indexOf(name) > -1) {
        ret.push(child);
      }
      ret = ret.concat(findComponentsDownward(child, compName));
    }
  }

  return ret;
}

// 找到指定的兄弟组件
function findComponentsAdjacent(context, compName, includeMe = false) {
  let parent = context.$parent;
  let brothers = parent.$children;
  let ret = [];

  for (let brother of brothers) {
    if (compName === brother.$options.name) {
      if (context !== brother || includeMe === true) {
        ret.push(brother);
      }
    }
  }

  return ret;
}

function oneOf(val, arr = []) {
  return arr.indexOf(val) > -1;
}

function hasClass(el, cls) {
  try {
    return el.classList.contains(cls);
  } catch (e) {
    return;
  }
}

function addClass(el, cls) {
  if (!el) return;
  try {
    el.classList.add(cls);
  } catch (e) {
    let className = el.className;
    if (!hasClass(el, cls)) {
      el.className = className + " " + cls;
    }
  }
}

function removeClass(el, cls) {
  try {
    el.classList.remove(cls);
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
};
