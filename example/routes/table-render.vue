<template>
  <f-table-render :columns="columns" :data="data"></f-table-render>
</template>

<script>
export default {
  data() {
    return {
      editIndex: -1,
      editName: "",
      editAge: "",
      editBirthday: "",
      editAddress: "",
      columns: [
        {
          title: "姓名",
          key: "name",
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return h("input", {
                domProps: {
                  value: row.name
                },
                on: {
                  input: event => {
                    this.editName = event.target.value;
                  }
                }
              });
            } else {
              return h("span", null, row.name);
            }
          }
        },
        {
          title: "年龄",
          key: "age",
          render: (h, { row, index, column }) => {
            if (this.editIndex === index) {
              return h('input', {
                domProps: {
                  value: row.age,
                },
                on: {
                  input: (event) => {
                    this.editAge = event.target.value;
                  }
                }
              })
            } else {
              return h('span', null, row.age);
            }
          }
        },
        {
          title: "出生日期",
          key: "birthday",
          render: (h, { row, column, index }) => {
            let date = new Date(-row.birthday);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDay();
            let birthday = `${year}-${month}-${day}`;
            return h("span", birthday);
          }
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h(
                  "button",
                  {
                    on: {
                      click: () => {
                        this.data[index].name = this.editName;
                        this.data[index].age = this.editAge;
                        this.data[index].birthday = this.editBirthday;
                        this.data[index].address = this.editAddress;
                        this.editIndex = -1;
                      }
                    }
                  },
                  "保存"
                ),
                h(
                  "button",
                  {
                    style: {
                      marginLeft: "6px"
                    },
                    on: {
                      click: () => {
                        this.editIndex = -1;
                      }
                    }
                  },
                  "取消"
                )
              ];
            } else {
              return h(
                "button",
                {
                  on: {
                    click: () => {
                      this.editName = row.name;
                      this.editAge = row.age;
                      this.editAddress = row.address;
                      this.editBirthday = row.birthday;
                      this.editIndex = index;
                    }
                  }
                },
                "修改"
              );
            }
          }
        }
      ],
      data: [
        {
          id: 1,
          name: "王小明",
          age: 18,
          birthday: "919526400000",
          address: "北京市朝阳区芍药居"
        },
        {
          id: 2,
          name: "张小刚",
          age: 25,
          birthday: "696096000000",
          address: "北京市海淀区西二旗"
        },
        {
          id: 3,
          name: "李小红",
          age: 30,
          birthday: "563472000000",
          address: "上海市浦东新区世纪大道"
        },
        {
          id: 4,
          name: "周小伟",
          age: 26,
          birthday: "687024000000",
          address: "深圳市南山区深南大道"
        }
      ]
    };
  }
};
</script>
