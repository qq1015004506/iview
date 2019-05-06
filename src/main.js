import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import devArticle from './components/dev-article'
import testerArticle from './components/tester-article'
import coderArticle from './components/coder-article'

import { directive as clickOutside } from 'v-click-outside-x'
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
Vue.use(OrgTree)
Vue.directive('clickOutside', clickOutside)

Vue.config.productionTip = false;
Vue.component('dev-article',devArticle);
Vue.component('tester-article',testerArticle);
Vue.component('coder-article',coderArticle);

router.beforeEach((to,from,next) => {
    const type = to.meta.type;
    if(type === "admin") {
        if(window.localStorage.getItem("admin")) {
            next();
        }else {
            next("/login")
        }
    }

    if(type === "coder") {
        if(window.localStorage.getItem("coder")) {
            next();
        }else {
            next("/login")
        }
    }

    if(type === "tester") {
        if(window.localStorage.getItem("tester")) {
            next();
        }else {
            next("/login")
        }
    }

    if(type === "login") {
        if(window.localStorage.getItem("login")) {
            next();
        }else {
            next("/login")
        }
    }

    next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
