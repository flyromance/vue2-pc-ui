<template>
  <div>
    <div>
      <f-button>default</f-button>
      <f-button type="primary">primary</f-button>
      <f-button type="dashed">dashed</f-button>
      <f-button type="text">text</f-button>
      <br>
      <f-button type="info">info</f-button>
      <f-button type="success">success</f-button>
      <f-button type="error">error</f-button>
      <f-button type="warning">waring</f-button>
    </div>
    <div>
      <f-button>default</f-button>
      <f-button type="primary" ghost>primary</f-button>
      <f-button type="dashed" ghost>dashed</f-button>
      <f-button type="text" ghost>text</f-button>
      <br>
      <f-button type="info" ghost>info</f-button>
      <f-button type="success" ghost>success</f-button>
      <f-button type="error" ghost>error</f-button>
      <f-button type="warning" ghost>waring</f-button>
    </div>
    <div>
      <f-button shape="circle" icon="ios-search"></f-button>
      <f-button icon="ios-search">default</f-button>
      <f-button shape="circle" icon="ios-search">default</f-button>
      <f-button shape="circle">search</f-button>
    </div>
    <div>
      <f-button ghost>ghost</f-button>
      <f-button @click.native="handleClick">button1</f-button>
    </div>
    <div>
      <f-button-group>
        <f-button>xxx</f-button>
      </f-button-group>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert(123);
    }
  }
};
</script>
