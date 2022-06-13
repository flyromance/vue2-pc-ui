<template>
  <div class="node">
    <div class="node-wrap">
      <div v-if="data.children && data.children.length" class="node-expand" @click="handleExpand">
        <div v-if="data.expand">-</div>
        <div v-else>+</div>
      </div>
      <div class="node-body">
        <div class="node-title">
          <f-checkbox
            v-if="showCheckbox"
            v-model="data.checked"
            @change="handleCheck"
          >{{data.title}}</f-checkbox>
          <span v-else>{{data.title}}</span>
        </div>
        <div class="node-children" v-if="data.expand">
          <f-tree-node
            v-for="(item, index) in data.children"
            :key="index"
            :data="item"
            :showCheckbox="showCheckbox"
          ></f-tree-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "../checkbox/checkbox.vue";
import {
  findComponentUpward,
  findComponentsUpward,
  findComponentsDownward,
  findComponentsAdjacent
} from "../../utils/assist.js";

export default {
  name: "f-tree-node",
  components: {
    // Checkbox
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tree: findComponentUpward(this, "f-tree")
    };
  },
  watch: {
    "data.children": {
      deep: true,
      handler: function(children) {
        if (children) {
          let allChecked = children.every(item => !!item.checked);
          this.$set(this.data, "checked", allChecked);
        }
      }
    }
  },
  methods: {
    handleExpand() {
      this.$set(this.data, "expand", !this.data.expand);
      let comp = findComponentUpward(this, "f-tree");
      if (comp) {
        comp.$emit("on-toggle-expand", this.data);
      }
    },
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);
      // this.checkAdjacent(this, "f-tree-node");
    },
    updateTreeDown(data, checked) {
      // let comps = findComponentsDownward(this, "f-tree-node");
      // comps.forEach(comp => {
      //   comp.$set(comp.data, "checked", checked);
      // });

      this.$set(data, "checked", checked);
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked);
        });
      }
    },
    checkAdjacent(context, compName) {
      let adjacentComps = findComponentsAdjacent(this, "f-tree-node");
      let isAllChecked = adjacentComps.every(comp => {
        return !!comp.data.checked;
      });
      if (isAllChecked) {
        let parentComp = findComponentUpward(this, "f-tree-node");
        if (parentComp) {
          parentComp.$set(parentComp.data, "checked", true);
        }
      }
    }
  }
};
</script>

<style>
.node-wrap {
  position: relative;
  padding-left: 20px;
}

.node-expand {
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}
</style>
