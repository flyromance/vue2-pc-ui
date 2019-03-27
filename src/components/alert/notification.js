import Vue from "vue";
import Alert from "./alert.vue";

Alert.newInstance = properties => {
  const props = properties || {};

  const instance = new Vue({
    data: props,
    render(h) {
      return h(Alert, {
        props
      });
    }
  });

  const component = instance.$mount();
  document.body.appendChild(component.$el);

  const alert = component.$children[0];

  return {
    add(options) {
      alert.add(options);
    },
    remove(name) {
      alert.remove(name);
    }
  };
};

export default Alert;
