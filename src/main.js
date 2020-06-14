import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';

import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min.js';
import { firebaseAuth } from '@/firebase';

import Loader from '@/components/app/Loader';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.component('Loader', Loader);

let app;

firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
