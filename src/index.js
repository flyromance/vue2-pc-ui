// 打包全量的js入口
import Affix from './affix'
import Button from './button'
// import Icon from './icon/icon.vue'
// import ButtonGroup from './button/button-group.vue'
// import Row from './grid/row.vue'
// import Col from './grid/col.vue'
// import Layout from './layout/layout.vue'
// import Header from './layout/header.vue'
// import Sider from './layout/sider.vue'
// import Content from './layout/content.vue'
// import Footer from './layout/footer.vue'
// import Card from './card/card.vue'
// import Collapse from './collapse/collapse.vue'
// import Switch from './switch/switch.vue'
// import Panel from './collapse/Panel.vue'
// import Form from './form/form.vue'
// import FormItem from './form/form-item.vue'
// import Input from './input/input.vue'
// import Checkbox from './checkbox/checkbox.vue'
// import CheckboxGroup from './checkbox/checkbox-group.vue'
// import alert from './alert/alert.js'
// import TableRender from './table/table-render.vue'
// import TableSlot from './table/table-slot.vue'
// import Tree from './tree/tree.vue'

const components = {
  Affix,
  Button
  // ButtonGroup,
  // Row,
  // Col,
  // Layout,
  // Header,
  // Sider,
  // Content,
  // Footer,
  // Card,
  // Collapse,
  // Switch,
  // Panel,
  // Form,
  // FormItem,
  // Input,
  // Checkbox,
  // CheckboxGroup,
  // TableRender,
  // TableSlot,
  // Tree
}

function install(Vue) {
  Object.keys(components).forEach((key) => {
    Vue.use(components[key])
  })

  // Vue.prototype.$alert = alert
}

const vuf = {
  version: require('../package.json').version,
  install,
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}



export default vuf
