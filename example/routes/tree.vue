<template>
  <f-tree :data="data" :showCheckbox="showCheckbox" @on-toggle-expand="handleToggleExpand" @on-select-change="handleSelect"/>
</template>

<script>
export default {
  data() {
    return {
      showCheckbox: true,
      data: {
        title: "parent1",
        expand: true,
        checked: true,
        children: [
          {
            title: "parent1-1",
            expand: true,
            children: [
              {
                title: "child2"
              },
              {
                title: "parent2",
                children: [
                  {
                    title: "child1"
                  },
                  {
                    title: "child2"
                  }
                ]
              }
            ]
          },
          {
            title: "parent1-2",
            children: [
              {
                title: "child1"
              },
              {
                title: "child2",
                children: [
                  {
                    title: "child1"
                  },
                  {
                    title: "child2"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    handleToggleExpand(data) {
    },
    handleSelect() {

    }
  }
};
</script>
