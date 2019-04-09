import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import devArticle from './components/dev-article'

import { directive as clickOutside } from 'v-click-outside-x'
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
Vue.use(OrgTree)
Vue.directive('clickOutside', clickOutside)

Vue.config.productionTip = false;
Vue.component('dev-article',devArticle);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
