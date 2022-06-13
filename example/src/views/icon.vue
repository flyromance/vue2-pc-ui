<template>
  <div class="icon-container">
    <f-icon type="md-alert" color="red" size="22"/>
    <f-icon :type="type" :color="color" :size="size"/>
    <f-icon :custom="custom"/>
    <div>
      <button @click="type = 'ios-search'">change type</button>
      <button @click="color = ''">change color</button>
      <button @click="size = '32px'">change size</button>
      <button @click="custom = 'icon-sss' ">change custom</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "green",
      type: "ios-add",
      size: 22,
      custom: "xxx"
    };
  },
  methods: {
    handleChangeColor() {
      this.color = "green";
    }
  }
};
</script>

<style>
</style>
