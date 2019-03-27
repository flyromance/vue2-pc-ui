<template>
  <div :class="cls" :style="sty">
    <div class="vuf-layout-sider-content">
      <slot/>
    </div>
    <div :class="trigger_cls" :style="trigger_sty" @click="handleTrigger">
      <Icon type="ios-arrow-back" :class="'vuf-layout-sider-trigger-icon'"/>
    </div>
  </div>
</template>

<script>
import Icon from "../icon/icon.vue";
import { findComponentUpward } from "../../utils/assist";

let cls_prefix = "vuf-layout-sider";

export default {
  name: "f-sider",
  components: {
    Icon
  },
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    "hide-trigger": {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let sty = {};
    let trigger_sty = {};
    let trigger_cls = [`${cls_prefix}-trigger`];
    let cls = [
      cls_prefix,
      {
        [`${cls_prefix}-has-trigger`]: !this.hideTrigger,
      }
    ];
    if (this.width) {
      sty.width = trigger_sty.width = parseInt(this.width) + "px";
    }

    if (this.hideTrigger) {
      trigger_sty.display = "none";
    }
    return {
      sty,
      cls,
      trigger_sty,
      trigger_cls
    };
  },
  watch: {
    width: {
      handler: function(val) {
        this.sty.width = this.trigger_sty.width = parseInt(this.width) + "px";
      }
    }
  },
  created() {
    this.noticeUp("add");
  },
  beforeDestroy() {
    this.noticeUp("remove");
  },
  methods: {
    noticeUp(type) {
      let layout = findComponentUpward(this, "f-layout");
      if (layout) {
        type === "add" ? layout.addCls() : layout.removeCls();
      }
    },
    handleTrigger() {
      let idx = this.cls.indexOf(`${cls_prefix}-collapsed`);
      let _idx = this.cls.indexOf(`${cls_prefix}-trigger-collapsed`);
      if (idx > -1) {
        this.cls.splice(idx, 1);
        this.trigger_cls.splice(_idx, 1);
        this.sty.width = this.trigger_sty.width = parseInt(this.width) + "px";
      } else {
        this.cls.push(`${cls_prefix}-collapsed`);
        this.trigger_cls.push(`${cls_prefix}-trigger-collapsed`);
        this.sty.width = this.trigger_sty.width = "78px";
      }
    }
  }
};
</script>

<style>
</style>
