<template>
  <div>
    <f-row>
      <f-col span="12">this is col 1</f-col>
      <f-col span="12">
        <f-row :gutter="gutter">
          <f-col span="12">this is col 11</f-col>
          <f-col span="12">this is col 12</f-col>
        </f-row>
      </f-col>
    </f-row>

    <div>
      <f-button @click="changeGutter($event)">change gutter</f-button>
    </div>

    <f-row type="flex">
      <f-col span="8">this is col 1</f-col>
      <f-col span="8">this is col 2</f-col>
      <f-col span="8">this is col 2</f-col>
    </f-row>

    <f-row type="flex">
      <f-col span="8" order="1">this is col 1</f-col>
      <f-col span="8" push="2">this is col 2</f-col>
      <f-col span="8" offset="4">this is col 2</f-col>
    </f-row>

    <f-row type="flex">
      <f-col xs="8">this is col 1</f-col>
      <f-col xs="8">this is col 2</f-col>
      <f-col xs="8">this is col 2</f-col>
    </f-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gutter: 12
    };
  },
  methods: {
    changeGutter(e, a) {
      console.log(e, a);
      this.gutter = 24;
    }
  }
};
</script>

<style>
</style>
