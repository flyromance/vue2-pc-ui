<template>
  <f-table-slot :columns="columns" :data="data">
    <template slot-scope="{ row, index }" slot="name">
      <input type="text" v-model="editName" v-if="editIndex === index">
      <span v-else>{{row.name}}</span>
    </template>

    <template slot-scope="{ row, index }" slot="age">
      <input type="text" v-model="editAge" v-if="editIndex === index">
      <span v-else>{{row.age}}</span>
    </template>

    <template slot-scope="{ row, index }" slot="birthday">
      <input type="text" v-model="editBirthday" v-if="editIndex === index">
      <span v-else>{{ getBirthday(row.birthday) }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="address">
      <input type="text" v-model="editAddress" v-if="editIndex === index">
      <span v-else>{{ row.address }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <button @click="handleSave(index)">保存</button>
        <button @click="handleCancel">取消</button>
      </div>
      <div v-else>
        <button @click="handleEdit(row, index)">修改</button>
      </div>
    </template>
  </f-table-slot>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",
          slot: "name"
        },
        {
          title: "年龄",
          slot: "age"
        },
        {
          title: "生日",
          slot: "birthday"
        },
        {
          title: "地址",
          slot: "address"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [
        {
          name: "范龙",
          age: 28,
          birthday: "919526400000",
          address: "北京市朝阳区望京"
        }
      ],
      editName: "",
      editAge: "",
      editAddress: "",
      editBirthday: "",
      editIndex: -1
    };
  },
  methods: {
    getBirthday(val) {
      let date = new Date(parseInt(val));
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDay();
      return `${year}-${month}-${day}`;
    },
    handleEdit(row, index) {
      this.editName = row.name;
      this.editAge = row.age;
      this.editAddress = row.address;
      this.editBirthday = row.birthday;
      this.editIndex = index;
    },
    handleCancel() {
      this.editIndex = -1;
    },
    handleSave(index) {
      this.editIndex = -1;
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
    }
  }
};
</script>
