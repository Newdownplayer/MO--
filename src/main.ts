import { APP } from './APP'
import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore';
import { fetchMe, mePromise } from './shared/me'

const router = createRouter({ history, routes })

// fetchMe()
// const whiteList: Record<string, 'exact' | 'startsWith'> = {
//     '/': 'exact',
//     '/start': 'exact',
//     '/welcome': 'startsWith',
//     '/sign_in': 'startsWith',
// }
// router.beforeEach((to, from) => {
//     for (const key in whiteList) {
//         const value = whiteList[key]
//         return (value === 'exact' && to.path === key) || (value === 'startsWith' && to.path.startsWith(key))
//     }
//     return mePromise!.then(
//         () => true,
//         () => { return '/sign_in?return_to' + to.path }
//     )
// })

const app = createApp(APP)
app.use(router)
app.mount('#app')