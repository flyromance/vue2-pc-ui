function broadcast(compName, evtName, param) {
  let children = this.$children || [];
  children.forEach((child) => {
    if (child.$options.name === compName) {
      child.$emit(evtName, param);
    } else {
      broadcast.call(child, compName, evtName, param);
    }
  });
}

export default {
  methods: {
    // 子组件 =>通知 => 最近一个父组件
    dispatch(compName, evtName, param) {
      if (!compName || !evtName) return;
      let parent = this.$parent;
      while (parent) {
        let parentName = parent.$options.name;
        if (!parentName || parentName !== compName) {
          parent = parent.$parent;
        } else {
          break;
        }
      }
      parent && parent.$emit(evtName, param);
    },

    // 父组件 => 通知 => 所有子组件
    broadcast(compName, evtName, param) {
      if (!compName || !evtName) return;
      broadcast.call(this, compName, evtName, param);
    },
  },
};
