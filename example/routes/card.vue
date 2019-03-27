<template>
  <div>
    <f-card :style="{width: '400px'}" :bordered="false">
      <p slot="title">this is title</p>
      <p slot="extra">extra</p>
      <div>this is content</div>
    </f-card>

    <f-card :style="{width: '400px'}" title="this is title" icon="ios-arrow-back" shadow>
      <p slot="extra">extra</p>
      <div>this is content</div>
    </f-card>

    <f-card :style="{width: '400px'}" dis-hover>
      <p slot="title">this is title</p>
      <p slot="extra">extra</p>
      <div>this is content</div>
    </f-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
