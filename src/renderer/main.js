import Vue from 'vue'
import axios from 'axios'
import { ipcRenderer } from 'electron'

import App from './App'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

ipcRenderer.on('autoUpdater:checking-for-update', (event, arg) => {
  document.getElementsByClassName('status')[0].innerHTML = 'Checking for update...';
  console.log(event, arg);
})
ipcRenderer.on('autoUpdater:update-downloaded', (event, arg) => {
  document.getElementsByClassName('status')[0].innerHTML = 'Update downloaded';
  console.log(event, arg);
})
ipcRenderer.on('autoUpdater:update-available', (event, arg) => {
  document.getElementsByClassName('status')[0].innerHTML = 'Update available';
  console.log(event, arg);
})
ipcRenderer.on('autoUpdater:update-not-available', (event, arg) => {
  document.getElementsByClassName('status')[0].innerHTML = 'Update not available';
  console.log(event, arg);
})
ipcRenderer.on('autoUpdater:error', (event, arg) => {
  document.getElementsByClassName('status')[0].innerHTML = 'Update Error';
  console.log(event, arg);
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
