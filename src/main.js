import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// The following finds all files in ./components/ which begin with Base
const requireComponent = require.context(
  './components', // Directory to search
  false, // Search subdirectories?
  /Base[A-Z]\w+\.(vue|js)$/ // Filename regex
)

// Requires each component found by require.context
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // Formats names from filenames
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
