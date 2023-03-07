import { defineComponent, PropType } from "vue";
import s from './FloatButton.module.scss';
import { Icon, IconName } from "./Icon";

export const FloatButton = defineComponent({
    props: {
        iconName: {
            type: String as PropType<IconName>,
            required: true
        },
    },
    setup: (props, context) => {
        const onclick = () => {
            console.log("on");
        }
        return () => (
            <div class={s.FloatButton} onClick={onclick}>
                <Icon name="add" class={s.add}>
                </Icon>
            </div>
        )
    }
})