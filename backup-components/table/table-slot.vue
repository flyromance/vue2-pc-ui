<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.id">{{col.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="row.id">
        <td v-for="col in columns" :key="col.id">
          <template v-if="'render' in col"></template>
          <template v-else-if="'slot' in col">
            <slot :name="col.slot" :index="rowIndex" :row="row" :column="col"></slot>
          </template>
          <template else>{{row[col.key]}}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from "./render.js";

export default {
  name: "f-table-slot",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Render
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #efefef;
}

thead th {
  font-weight: 600;
  background: #f7f7f7;
  color: #5c6b77;
}

tbody td, thead th {
  padding: 8px 16px;
  text-align: left;
  border: 1px solid #efefef;
}
</style>

