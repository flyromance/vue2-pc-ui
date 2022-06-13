<template>
  <div>
    <input type="text" @input="handleInput" @blur="handleBlur" :value="currentValue">
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "f-input",
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("f-form-item", "on-field-change", value);
    },
    handleBlur() {
      this.dispatch("f-form-item", "on-field-blur", this.currentValue);
    }
  },
  updated() {
    console.log(3);
  }
};
</script>

