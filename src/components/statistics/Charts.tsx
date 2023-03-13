import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { FormItem } from "../../shared/Form";
import { Bars } from "./Bars";
import s from './Charts.module.scss';
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";


export const Charts = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false
        },
       endDate: {
            type: String as PropType<string>,
            required: false
        }
    },
    setup: (props, context) => {
        const category = ref('expense')
        return () => (
            <div class={s.wrapper}>
                <FormItem label="类型" class={s.item} v-model={category.value} type="select" option={[
                    { value: 'expense', text: '支出' },
                    { value: 'income', text: '收入' }
                ]} />
                <LineChart />
                <PieChart />
                <Bars />
            </div >
        )
    }
})