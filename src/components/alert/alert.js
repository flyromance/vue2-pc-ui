import Notification from "./notification";

let instance;

function getInstance() {
  if (instance) return instance;
  return (instance = Notification.newInstance());
}

function notice(options) {
  let instance = getInstance();
  options = options || {};

  instance.add({
    content: options.content,
    duration: options.duration
  });
}

function info(options) {
  return notice(options);
}

function success(options) {
  return notice(options);
}

function warn(options) {
  return notice(options);
}

function error(options) {
  return notice(options);
}

export default {
  info,
  success,
  warning: warn,
  warn,
  error
};

export { info, success, warn, warn as warning, error };
