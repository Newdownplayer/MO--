import { defineComponent, PropType } from "vue";
import s from './Charts.module.scss';
export const Charts = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>Charts</div>
        )
    }
})