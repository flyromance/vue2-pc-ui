<template>
  <div class="vuf-checkbox">
    <label>
      <input :disabled="disabled" type="checkbox" :checked="currentValue" @change="handleChange">
      <slot/>
    </label>
  </div>
</template>

<script>
export default {
  name: "f-checkbox",
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    trueValue: {
      type: [Boolean, Number, String],
      default: true
    },
    falseValue: {
      type: [Boolean, Number, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value === this.trueValue
    }
  },
  watch: {
    value: {
      handler: function(val) {
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel();
        } else {
          throw "value should be trueValue or falseValue!";
        }
      },
      // immediate: true,
    },
    disabled: {
      handler: function(val) {
        this.disabled = !!val;
      }
    }
  },
  methods: {
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
    handleChange(e) {
      let checked = e.target.checked;
      this.currentValue = checked;
      let value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

