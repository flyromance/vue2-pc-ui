<template>
  <div>
    <f-form ref="form" :model="data" :rules="rules" inline>
      <f-form-item label="用户名" prop="name">
        <f-input :value="data.name" @input="data.name = $event"/>
      </f-form-item>
      <f-form-item label="邮箱" prop="email">
        <f-input v-model="data.email"/>
      </f-form-item>
    </f-form>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      },
      data: {
        name: "",
        email: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('ok');
        } else {
          alert('fail');
        }
      });
    }
  }
};
</script>

<style>
</style>

