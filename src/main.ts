import { APP } from './APP'
import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore';

const router = createRouter({ history, routes })

const app = createApp(APP)
app.use(router)
app.mount('#app')