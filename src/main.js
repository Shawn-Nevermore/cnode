import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

Vue.filter("formatDate", str => {
  if (!str) return "";
  let date = new Date(str);
  let time = new Date().getTime() - date.getTime();
  const SEC = 1000;
  const MIN = 60000;
  const HOUR = 3600000;
  const DAY = 86400000;
  const MONTH = 2592000000;
  const YEAR = 31536000000;
  if (time < 0) {
    return "";
  } else if (time / SEC < 30) {
    return "刚刚";
  } else if (time / SEC < 60) {
    return parseInt((time / SEC)) + " 秒前";
  } else if (time / MIN < 60) {
    return parseInt((time / MIN)) + " 分钟前";
  } else if (time / HOUR < 24) {
    return parseInt((time / HOUR)) + " 小时前";
  } else if (time / DAY < 31) {
    return parseInt((time / DAY)) + " 天前";
  } else if (time / MONTH < 12) {
    return parseInt((time / MONTH)) + " 个月前";
  } else {
    return parseInt((time / YEAR)) + " 年前";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
