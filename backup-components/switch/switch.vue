<template>
  <span :class="cls" :style="sty" @click="toggle">
    <span :class="innerCls">
      <slot name="open" v-if="currentValue"></slot>
      <slot name="close" v-else/>
    </span>
  </span>
</template>

<script>
const cls_prefix = "vuf-switch";

export default {
  name: "f-switch",
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false,
    },
    size: {
      type: String,
      required: true,
      default: "middle",
      validator(v) {
        return ["middle", "large", "small"].indexOf(v) > -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    trueValue: {
      type: [Number, String, Boolean],
      default: true,
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false,
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  computed: {
    cls() {
      return [
        cls_prefix,
        {
          [`${cls_prefix}-disabled`]: this.disabled,
          [`${cls_prefix}-checked`]: this.currentValue === this.trueValue,
          [`${cls_prefix}-large`]: this.size === "large",
          [`${cls_prefix}-small`]: this.size === "small",
          [`${cls_prefix}-default`]: this.size === "middle"
        }
      ];
    },
    sty() {
      return {};
    },
    innerCls() {
      return [`${cls_prefix}-inner`];
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.currentValue = val;
      }
    }
  },
  methods: {
    toggle(e) {
      e.preventDefault();
      if (this.disabled) {
        return false;
      }
      let currentValue = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;
      this.currentValue = currentValue;
      this.$emit("input", currentValue);
      this.$emit("on-change", currentValue);
    }
  }
};
</script>

<style>
</style>
