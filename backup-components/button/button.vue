<template>
  <button type="button" :class="cls" @click="handleClick">
    <Icon v-if="icon" :type="icon"/>
    <span>
      <slot/>
    </span>
  </button>
</template>

<script>
import Icon from "../icon/icon.vue";

const cls_prefix = "vuf-btn";

export default {
  name: "f-button",
  components: {
    Icon
  },
  props: {
    type: {
      type: String, // primary dashed text info success waring error
      default: "default"
    },
    size: {
      type: String,
      default: "middle",
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["small", "middle", "large"].indexOf(value) !== -1;
      }
    },
    ghost: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    shape: {
      type: String,
      default: "circle"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    cls() {
      return [
        cls_prefix,
        {
          [`${cls_prefix}-${this.type}`]: true
        }
      ];
    },
    sty() {

    }
  },
  watch: {
    type: {
      heander: function(val) {
        this.cls = {
          [`vuf-btn-${val}`]: true
        };
      }
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
};
</script>
