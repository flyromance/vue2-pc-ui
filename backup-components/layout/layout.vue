<template>
  <div :class="cls" :style="sty">
    <slot/>
  </div>
</template>

<script>
const cls_prefix = "vuf-layout";

export default {
  name: "f-layout",
  props: {},
  data() {
    let cls = [
      cls_prefix,
    ];
    let sty = {};
    return {
      cls,
      sty
    }
  },
  methods: {
    addCls() {
      this.cls.push(`${cls_prefix}-has-sider`);
    },
    removeCls() {
      this.cls = [cls_prefix];
    }
  }
};
</script>

<style>
</style>
