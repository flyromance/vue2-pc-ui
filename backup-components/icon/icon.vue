<template>
  <i :class="cls" :style="sty"/>
</template>

<script>
const cls_prefix = "vuf-icon";

export default {
  name: "f-icon",
  props: {
    type: {
      type: String, // eg: alert
      default: ""
    }, // 有custom时， type就忽略
    custom: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number], // 12px 12
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    sty() {
      return {
        color: this.color,
        "font-size": parseInt(this.size) + "px"
      };
    },
    cls() {
      return [
        cls_prefix,
        {
          [`${cls_prefix}-${this.type}`]: this.type !== "",
          [`${this.custom}`]: this.custom !== "",
        },
        // this.type ? `${cls_prefix}-${this.type}` : "",
        // this.custom ? this.custom : ""
      ];
    }
  },
  // 可以用computed
  // data() {
  //   let sty = {};
  //   let cls = {
  //     "vuf-icon": true,
  //     [`vuf-icon-${this.type}`]: true
  //   };
  //   if (this.color) sty["color"] = this.color;
  //   if (this.size) {
  //     sty["font-size"] =
  //       typeof this.size === "number"
  //         ? this.size + "px"
  //         : parseInt(this.size) + "px";
  //   }

  //   if (this.custom) {
  //     cls = this.custom;
  //   }

  //   return {
  //     cls,
  //     sty
  //   };
  // },
  // watch: {
  //   type: {
  //     handler: function(val) {
  //       this.cls = {
  //         "vuf-icon": true,
  //         [`vuf-icon-${this.type}`]: true
  //       };
  //     }
  //   },
  //   size: {
  //     handler: function(val) {
  //       console.log(val);
  //       this.sty["font-size"] = val;
  //     }
  //   },
  //   color: {
  //     handler: function(val) {
  //       console.log(val);
  //       this.sty.color = val;
  //     }
  //   },
  //   custom: function(val) {}
  // },
  methods: {}
};
</script>