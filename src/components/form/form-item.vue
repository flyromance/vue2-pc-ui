<template>
  <div class="f-form-item">
    <div
      v-if="label"
      class="f-form-item-label"
      :class="{ 'f-form-item-label-required': isRequired}"
    >{{label}}</div>
    <div class="f-form-item-body">
      <div class="f-form-item-field">
        <slot/>
      </div>
      <div class="f-form-item-feedback" v-if="validateState === 'error'">{{validateMessage}}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import emitter from "../../mixins/emitter";

export default {
  name: "f-form-item",
  mixins: [emitter],
  inject: ["form"],
  props: {
    prop: {
      type: String
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      isRequired: false,
      validateState: "",
      validateMessage: ""
    };
  },
  computed: {
    filedValue() {
      return this.form.model[this.prop];
    }
  },
  created() {},
  mounted() {
    if (this.prop) {
      this.dispatch("f-form", "on-form-item-add", this);

      this.initialValue = this.filedValue;

      let rules = this.getRules();
      if (rules.length) {
        rules.every(rule => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }

      this.$on("on-field-blur", this.onFieldBlur);
      this.$on("on-field-change", this.onFieldChange);
    }
  },
  beforeDestroy() {
    this.dispatch("f-form", "on-form-item-remove", this);
  },
  methods: {
    onFieldBlur(val) {
      this.validate("blur");
    },
    onFieldChange(val) {
      this.validate("change");
    },
    getRules() {
      let rules = this.form.rules;
      rules = rules ? rules[this.prop] : [];
      return [].concat(rules || []);
    },
    getFilterRule(trigger) {
      return this.getRules().filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) > -1
      );
    },
    validate(trigger, callback = () => {}) {
      let rules = this.getFilterRule(trigger);
      if (!rules || !rules.length) return true;

      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let descriptor = {
        [this.prop]: rules
      };

      const validator = new AsyncValidator(descriptor);

      let model = {
        [this.prop]: this.filedValue
      };

      validator.validate(model, { firstFields: true }, errors => {
        // errors = null or [{ field, message },]
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";

        callback(errors);
      });
    },
    resetField() {
      this.validateState = "";
      this.validateMessage = "";

      this.form.model[this.prop] = this.initialValue;
    }
  }
};
</script>

<style lang="less">
.vuf-form-item {
  display: flex;
  &-label {
    width: 100px;
  }
  &-label-required {
    &::before {
      content: "*";
      color: red;
    }
  }
}
</style>
