import { APP } from './APP'
import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore';
import { http } from './shared/Http'
import { fetchMe, mePromise } from './shared/me'

const router = createRouter({ history, routes })

fetchMe()
router.beforeEach(async (to, from) => {
    if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
        return true
    } else {
        const path = await mePromise!.then(
            () => true,
            () => { return '/sign_in?return_to' + to.path }
        )
        return path
    }
})

const app = createApp(APP)
app.use(router)
app.mount('#app')