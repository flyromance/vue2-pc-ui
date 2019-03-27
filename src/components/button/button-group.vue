<template>
  <div class="vuf-button-group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "f-button-group",
  props: {
    shape: {
      type: String,
      default: "default"
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cls: {
        [`vuf-btn-${this.type}`]: true
      }
    };
  },
  watch: {
    type: {
      heander: function(val) {
        this.cls = {
          [`vuf-btn-${val}`]: true
        };
      }
    }
  }
};
</script>
