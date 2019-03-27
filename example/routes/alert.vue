<template>
  <div>
    <button @click="handleOpen1">打开提示 1</button>
    <button @click="handleOpen2">打开提示 2</button>
    <div :style="{margin: '0 -8px 0 -8px', position: 'relative'}">ddd</div>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen1() {
      console.log(123);
      this.$alert.info({
        content: "我是提示信息 1",
        duration: 3
      });
    },
    handleOpen2() {
      this.$alert.info({
        content: "我是提示信息 2",
        duration: 2
      });
    }
  }
};
</script>