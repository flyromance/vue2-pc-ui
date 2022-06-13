<template>
  <div>
    <f-switch v-model="val" @on-change="change" :true-value="1" :false-value="2">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </f-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 1
    };
  },
  methods: {
    change(v) {
      console.log(this.val);
    }
  }
};
</script>

<style>
</style>
