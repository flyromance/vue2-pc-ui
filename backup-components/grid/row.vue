<template>
  <div :class="cls" :style="sty">
    <slot/>
  </div>
</template>

<script>
import {
  oneOf,
  findComponentDownward,
  findComponentsAdjacent
} from "../../utils/assist";

const prefix_cls = "vuf-row";

export default {
  name: "f-row",
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    type: {
      validator: function(val) {
        return oneOf(val, ["flex"]);
      }
    },
    // 水平方向排列
    justify: {
      validator(value) {
        return oneOf(value, [
          "start",
          "end",
          "center",
          "space-around",
          "space-between"
        ]);
      }
    },
    // 垂直方向排列
    align: {
      validator(value) {
        return oneOf(value, ["top", "middle", "bottom"]);
      }
    },
    className: {
      type: String
    }
  },
  computed: {
    cls() {
      return [
        this.type ? `${prefix_cls}-flex` : prefix_cls,
        {
          [`${prefix_cls}-${this.type}-${this.justify}`]: !!this.justify,
          [`${prefix_cls}-${this.type}-${this.align}`]: !!this.align,
          [`${this.className}`]: !!this.className
        }
      ];
    },
    sty() {
      let ret = {};
      if (this.gutter) {
        ret.marginLeft = -this.gutter / 2 + "px";
        ret.marginRight = -this.gutter / 2 + "px";
      }
      return ret;
    }
  },
  mounted() {
    // this.updateGutter();
  },
  watch: {
    gutter(val) {
      console.log(val);
      this.updateGutter(val);
    }
  },
  methods: {
    updateGutter(val) {
      let col = findComponentDownward(this, "f-col"); 
      let cols = findComponentsAdjacent(col, "f-col", true);
      if (cols) {
        cols.forEach(col => {
          // 组件实例
          if (val !== 0) {
            col.gutter = val;
          }
        });
      }
    }
  }
};
</script>
