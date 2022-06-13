<template>
  <div class="alert">
    <div class="alert-item" v-for="item in notices" :key="item.name">
      <div class="alert-item-content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
let index = 0;

function getUuid() {
  return `alert-${index++}`;
}

export default {
  data() {
    return {
      notices: []
    };
  },
  methods: {
    add: function(notice) {
      const _uuid = getUuid();

      let _notice = Object.assign(
        {
          name: _uuid
        },
        notice
      );
      this.notices.push(_notice);

      const duration = notice.duration || 2;

      setTimeout(() => {
        this.remove(_uuid);
      }, duration * 1000);
    },
    remove: function(uuid) {
      let index = -1;
      this.notices.forEach((item, idx) => {
        if (item.name === uuid) {
          index = idx;
        }
      });
      index > -1 && this.notices.splice(index, 1);
    }
  }
};
</script>


<style>
.alert {
  position: fixed;
  top: 16px;
  left: 0px;
  width: 100%;
  text-align: center;
}

.alert-item-content {
  display: inline-block;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
</style>

