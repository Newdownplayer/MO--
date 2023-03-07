import { defineComponent, PropType } from "vue";
import s from './Navbar.module.scss';
export const Navbar = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    setup: (props, context) => {
        const { slots } = context;
        return () => (
            <div class={s.navbar}>
                <div class={s.icon_wrapper}>
                    {slots.icon?.()}
                </div>
                <div class={s.title_wrapper}>
                    {slots.default?.()}
                </div>
            </div>
        )
    }
})