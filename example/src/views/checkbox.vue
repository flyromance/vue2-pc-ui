<template>
  <div>
    <div>
      <f-checkbox
        v-model="single"
        @change="onSingleChange"
        :trueValue="1"
        :falseValue="0"
        :disabled="disabled"
      >单独选项</f-checkbox>
      <div>数据: {{single}}</div>
    </div>

    <div>
      <f-checkbox-group v-model="multiple">
        <f-checkbox label="option1">选项1</f-checkbox>
        <f-checkbox label="option2">选项2</f-checkbox>
      </f-checkbox-group>
    </div>

    <div>
      <form id="form">
        <input type="checkbox" name="fan" value="fan">
        <input type="radio" name="long">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      single: 1,
      disabled: false,
      multiple: []
    };
  },
  created() {
    window.aaa = this;
  },
  methods: {
    onSingleChange(checked) {
      console.log(checked);
    }
  }
};
</script>

