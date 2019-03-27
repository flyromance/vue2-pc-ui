<template>
  <div id="app">
    <f-layout>
      <f-header>
        <f-icon @click.native="handleToggle" class="trigger-icon" type="md-menu"></f-icon>
        <div class="logo">
          <h2>vuf</h2>
        </div>
        <div class="header-nav">this is nav</div>
        <div class="header-menu">this is menu</div>
      </f-header>
      <f-layout>
        <f-sider hide-trigger>
          <component-list/>
        </f-sider>
        <f-content :style="{padding: '20px'}">
          <router-view></router-view>
        </f-content>
      </f-layout>
    </f-layout>
  </div>
</template>


<script>
import componentList from "./components/component-list";
export default {
  components: {
    "component-list": componentList
  },
  methods: {
    handleToggle: function() {}
  }
};
</script>

<style lang="less">
.trigger-icon {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
</style>

