import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'vue-toast-notification/dist/theme-sugar.css'

import './assets/main.css'
import './icons'

import axios from 'axios'

import jQuery from 'jquery'

window.$ = jQuery;

axios.interceptors.request.use(config => {
    let token = null;
    try {
        token = localStorage.getItem("token");
    } catch { }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (response) => {
        if (response.data.code == 0) {
            localStorage.removeItem("token")
            router.push('/login');
        } else if (response.data.code == 404) {
            router.push({ name: 'pageNotfound' });
        } else if (response.data.code >= 500) {
            router.push('/server-error');
        }
        return response;
    });

axios.defaults.baseURL = 'https://afp.daralquran.ps'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
