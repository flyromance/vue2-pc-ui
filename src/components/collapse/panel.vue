<template>
  <div :class="classes" :style="styles">
    <div :class="headerClasses" @click="handleClick">
      <Icon type="ios-arrow-forward"/>
      <slot name="title"/>
    </div>
    <collapse-transition>
      <div :class="contentClasses" v-show="opened">
        <slot/>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import Icon from "../icon/icon.vue";
import CollapseTransition from "../base/collapse-transition.vue";
import { findComponentUpward } from "../../utils/assist";

const cls_prefix = "vuf-collapse-panel";

export default {
  name: "f-panel",
  components: {
    Icon,
    CollapseTransition
  },
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      opened: false
    };
  },
  computed: {
    classes() {
      return [
        cls_prefix,
        {
          [`${cls_prefix}-opened`]: this.opened
        }
      ];
    },
    styles() {},
    headerClasses() {
      return `${cls_prefix}-header`;
    },
    contentClasses() {
      return `${cls_prefix}-content`;
    }
  },
  watch: {},
  created() {
    let collapse = findComponentUpward(this, "f-collapse");
    if (collapse) {
      collapse.notice();
    }
  },
  methods: {
    onNotice(val) {
      if (typeof val === "string") {
        if (val === this.name) {
          this.opened = true;
        } else {
          this.opened = false;
        }
      } else {
        if (val.indexOf(this.name) > -1) {
          this.opened = true;
        } else {
          this.opened = false;
        }
      }
    },
    handleClick() {
      let collapse = findComponentUpward(this, "f-collapse");
      if (collapse) {
        collapse.update({
          type: this.opened ? "close" : "open",
          name: this.name
        });
      }
    }
  }
};
</script>

<style>
</style>
