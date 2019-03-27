import Icon from "./components/icon/icon.vue";
import Button from "./components/button/button.vue";
import ButtonGroup from "./components/button/button-group.vue";
import Row from "./components/grid/row.vue";
import Col from "./components/grid/col.vue";
import Layout from "./components/layout/layout.vue";
import Header from "./components/layout/header.vue";
import Sider from "./components/layout/sider.vue";
import Content from "./components/layout/content.vue";
import Footer from "./components/layout/footer.vue";
import Card from "./components/card/card.vue";
import Collapse from "./components/collapse/collapse.vue";
import Switch from "./components/switch/switch.vue";
import Panel from "./components/collapse/Panel.vue";
import Form from "./components/form/form.vue";
import FormItem from "./components/form/form-item.vue";
import Input from "./components/input/input.vue";
import Checkbox from "./components/checkbox/checkbox.vue";
import CheckboxGroup from "./components/checkbox/checkbox-group.vue";
import alert from "./components/alert/alert.js";
import TableRender from "./components/table/table-render.vue";
import TableSlot from "./components/table/table-slot.vue";
import Tree from "./components/tree/tree.vue";

const components = {
  Icon,
  Button,
  ButtonGroup,
  Row,
  Col,
  Layout,
  Header,
  Sider,
  Content,
  Footer,
  Card,
  Collapse,
  Switch,
  Panel,
  Form,
  FormItem,
  Input,
  Checkbox,
  CheckboxGroup,
  TableRender,
  TableSlot,
  Tree,
};

function install(Vue) {
  Object.keys(components).forEach(item => {
    Vue.component(components[item].name, components[item]);
  });

  Vue.prototype.$alert = alert;
}

const vuf = {
  version: require("../package.json").version,
  install,
  ...components
};

export default vuf;
