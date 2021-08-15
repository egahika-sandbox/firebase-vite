// register vue composition api globally
import 'vue-global-api'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createHead } from '@vueuse/head'
import firebase from 'firebase'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import 'firebaseui/dist/firebaseui.css'

const firebaseConfig = {
  apiKey: 'AIzaSyCq0LvNPfBqsxA8OPGy4XnLbtqxdRsBzi0',
  authDomain: 'fir-vite.firebaseapp.com',
  projectId: 'fir-vite',
  storageBucket: 'fir-vite.appspot.com',
  messagingSenderId: '927074029528',
  appId: '1:927074029528:web:42cbadc420d0c86be3ecad',
}
firebase.initializeApp(firebaseConfig)

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})
const head = createHead()
app.use(head)
app.use(router)
app.mount('#app')
