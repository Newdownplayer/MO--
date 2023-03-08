import { defineComponent, PropType, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss';
export const Charts = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    setup: (props, context) => {
        const category = ref('expense')
        return () => (
            <div class={s.wrapper}>
                <FormItem label="类型" v-model={category.value} type="select" option={[
                    { value: 'expense', text: '支出' },
                    { value: 'income', text: '收入' }
                ]} />
            </div>
        )
    }
})