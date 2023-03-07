import { defineComponent, ref, Transition, VNode, watchEffect } from "vue";
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router"
import s from "./Welcome.module.scss"
import { useSwipe } from "../hooks/useSwipe";
import logo from '../assets/icons/logo.svg'
import { throttle } from "../config/thirttke";
const pushMap: Record<string, string> = {
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/start'
}
export const Welcome = defineComponent({
    setup: (props, context) => {
        const main = ref<HTMLElement>()
        const router = useRouter()
        const route = useRoute()
        const { direction, swiping } = useSwipe(main, {
            beforeStart: e => e.preventDefault()
        })
        const push = throttle(() => {
            const name = (route.name || 'Welcome1').toString()
            const path = pushMap[name]
            router.push(path)
        }, 500)
        watchEffect(() => {
            if (swiping.value && direction.value === 'left') {
                push()
            }
        })
        return () => <div class={s.wrapper}>
            <header>
                <img class={s.logo} src={logo} />
                <h1>MO记账</h1>
            </header>
            <main class={s.main} ref={main}>
                <RouterView name="main">
                    {({ Component: x, route: R }: {
                        Component: VNode;
                        route: RouteLocationNormalizedLoaded
                    }) =>
                        <Transition
                            enterActiveClass={s.slide_fade_enter_active}
                            enterFromClass={s.slide_fade_enter_from}
                            leaveToClass={s.slide_fade_leave_to}
                            leaveActiveClass={s.slide_fade_leave_active}
                        >
                            {x}
                        </Transition>
                    }
                </RouterView>
            </main>
            <footer>
                <RouterView name="footer"></RouterView>
            </footer>
        </div>
    }
})