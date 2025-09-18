import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { message } from 'ant-design-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Configure global message settings
message.config({
  top: '0',
  right: '0',
  duration: 3,
  maxCount: 3,
})

app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
