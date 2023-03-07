import { defineComponent, Transition, VNode } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import "./App.scss"

export const APP = defineComponent({
    setup() {
        return () => (
            <div class="page">
                <RouterView />
            </div>
        )
    }
})