<template>
  <div class="tree">
    <tree-node :data="treeData" :showCheckbox="showCheckbox"></tree-node>
  </div>
</template>

<script>
import TreeNode from "./tree-node.vue";

export default {
  name: "f-tree",
  components: {
    TreeNode
  },
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      treeData: {}
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function() {
        this.rebuildData();
      },
      immediate: true
    }
  },
  mounted() {},
  created() {
  },
  methods: {
    rebuildData() {
      this.treeData = JSON.parse(JSON.stringify(this.data));
    }
  }
};
</script>
