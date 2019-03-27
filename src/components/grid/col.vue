<template>
  <div :class="cls" :style="sty">
    <slot/>
  </div>
</template>

<script>
import { findComponentUpward } from "../../utils/assist";

const prefix_cls = "vuf-col";

export default {
  name: "f-col",
  props: {
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    push: {
      type: [Number, String]
    },
    pull: {
      type: [Number, String]
    },
    order: {
      type: [Number, String]
    },
    xs: {
      type: [Number, String, Object]
    },
    sm: {
      type: [Number, String, Object]
    },
    md: {
      type: [Number, String, Object]
    },
    lg: {
      type: [Number, String, Object]
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      gutter: 0
    };
  },
  computed: {
    cls() {
      let cls = [
        prefix_cls,
        {
          [`${prefix_cls}-${this.span}`]: this.span,
          [`${prefix_cls}-offset-${this.offset}`]: !!this.offset,
          [`${prefix_cls}-push-${this.push}`]: !!this.push,
          [`${prefix_cls}-pull-${this.pull}`]: !!this.pull,
          [`${prefix_cls}-order-${this.order}`]: !!this.order,
          [`${this.className}`]: this.className
        }
      ];
      ["xs", "sm", "md", "lg"].forEach(item => {
        if (typeof this[item] === "number" || typeof this[item] === "string") {
          cls.push(`${prefix_cls}-${item}-${this[item]}`);
        } else if (typeof this[item] === "object") {
          let props = this[item];
          Object.keys(props).forEach(prop => {
            prop !== "span"
              ? cls.push(`${prefix_cls}-${item}-${prop}-${props[prop]}`)
              : cls.push(`${prefix_cls}-${item}-${props[prop]}`);
          });
        }
      });
      return cls;
    },
    sty() {
      let sty = {};
      if (this.gutter !== 0) {
        sty.paddingLeft = this.gutter / 2 + "px";
        sty.paddingRight = this.gutter / 2 + "px";
      }
      return sty;
    }
  },
  methods: {
    updateGutter() {
      let row = findComponentUpward(this, "f-row");
      if (row) {
        row.updateGutter(row.gutter);
      }
    }
  },
  mounted() {
    this.updateGutter();
  },
  beforeDestroy() {
    this.updateGutter();
  }
};
</script>
