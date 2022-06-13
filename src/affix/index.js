import Affix from './affix'

const install = (Vue) => {
  Vue.component(Affix.name, Affix)
}

Affix.install = install

export default Affix
