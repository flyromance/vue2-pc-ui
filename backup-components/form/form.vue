<template>
  <div class="f-form" :class=" inline ? 'f-form-inlne' : '' ">
    <form>
      <slot/>
    </form>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "f-form",
  mixins: [emitter],
  provide() {
    return {
      form: this
    };
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: {}
    },
    model: {
      type: Object,
      default: {}
    }
  },
  watch: {
    inline() {}
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    this.$on("on-form-item-add", field => {
      field && this.fields.push(field);
    });
    this.$on("on-form-item-remove", field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  beforeDestroy() {},
  methods: {
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    validate(callback) {
      return new Promise((resolve, reject) => {
        let valid = true;
        this.fields.forEach(field => {
          field.validate("", error => {
            if (valid && error) {
              valid = false;
            }
          });
        });

        resolve(valid);

        if (typeof callback === "function") {
          callback(valid);
        }
      });
    }
  }
};
</script>

