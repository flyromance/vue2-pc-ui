<template>
  <div :class="classes" :style="styles">
    <slot/>
  </div>
</template>

<script>
import { findComponentsDownward } from "../../utils/assist";

const cls_prefix = "vuf-collapse";

export default {
  name: "f-collapse",
  props: {
    value: {
      type: [Array, String]
    },
    accordion: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [cls_prefix,
        {
          [`${cls_prefix}-simple`]: this.simple,
        }
      ];
    },
    styles() {
      return {};
    }
  },
  watch: {
    value: {
      handler(val) {
        this.notice(val);
      }
    }
  },
  methods: {
    notice() {
      let panels = findComponentsDownward(this, "f-panel");
      if (panels && panels.length) {
        panels.forEach(panel => {
          panel.onNotice(this.value);
        });
      }
    },
    update({ type, name }) {
      if (type === "open") {
        this.$emit("input", name);
        this.$emit("on-change", [name]);
      } else {
        this.$emit("input", "");
        this.$emit("on-change", []);
      }
    }
  }
};
</script>

<style>
</style>
