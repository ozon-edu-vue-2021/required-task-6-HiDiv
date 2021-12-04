import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAmountUp,
  faSortAmountDown,
  faSort,
  faFilter,
  faFunnelDollar,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faSortAmountUp, faSortAmountDown, faSort, faFilter, faFunnelDollar, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import VTooltipPlugin from 'v-tooltip'
import 'v-tooltip/dist/v-tooltip.css'
Vue.use(VTooltipPlugin);

import { Directive } from '@/directives/detect-viewport';
Vue.directive('detect-viewport', Directive);

import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
Vue.use(VueVirtualScroller);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
