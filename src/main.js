import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.baseURL = 'http://localhost:8000';

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render(h) {
    return h(App);
  },
}).$mount('#app');
