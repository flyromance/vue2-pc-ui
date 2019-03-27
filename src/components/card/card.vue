<template>
  <div :class="cls">
    <div class="vuf-card-head" v-if="showHead">
      <slot name="title">
        <p v-if="title">
          <Icon v-if="icon" :type="icon"/>
          <span>{{title}}</span>
        </p>
      </slot>
    </div>
    <div class="vuf-card-extra" v-if="showExtra">
      <slot name="extra"/>
    </div>
    <div class="vuf-card-body">
      <slot/>
    </div>
  </div>
</template>

<script>
import Icon from "../icon/icon.vue";
const cls_prefix = "vuf-card";

export default {
  name: "f-card",
  components: {
    Icon
  },
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Number,
      default: 16
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showHead: true,
      showExtra: true
    };
  },
  computed: {
    cls() {
      return [
        cls_prefix,
        {
          [`${cls_prefix}-bordered`]: this.bordered,
          [`${cls_prefix}-shadow`]: this.shadow,
          [`${cls_prefix}-dis-hover`]: this.disHover
        }
      ];
    }
  },
  mounted() {
    this.showHead = this.title || this.$slots.title !== undefined;
    this.showExtra = this.$slots.extra !== undefined;
  }
};
</script>

<style>
</style>
