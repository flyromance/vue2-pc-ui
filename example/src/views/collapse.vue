<template>
  <div>
    <!-- <f-collapse v-model="val" > -->
    <f-collapse :value="val" @input="val = $event" @on-change="handleChange" :style="{width: '400px'}">
      <f-panel name="1">
        <span slot="title">title 1</span>
        <div>content 1</div>
        <div>content 2</div>
      </f-panel>
      <f-panel name="2">
        <span slot="title">title 2</span>panel-2
      </f-panel>
    </f-collapse>

    <div>
      <button @click="toggle">toggle</button>
      <transition name="fade">
        <p v-show="showP">this is p</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showP: true,
      val: "1"
    };
  },
  methods: {
    handleChange(e) {
      console.log(e);
    },
    toggle() {
      this.showP = !this.showP;
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s linear;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  /* opacity: 1; */
}
</style>
