import { defineComponent, PropType } from "vue";
import { FloatButton } from "../../shared/FloatButton";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: true,
        },
        endDate: {
            type: String as PropType<string>,
            required: true,
        },
    },
    setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>
                <ul class={s.total}>
                    <li><span>收入</span><span>1200</span></li>
                    <li><span>支出</span><span>1100</span></li>
                    <li><span>净收入</span><span>100</span></li>
                </ul>
                <ol class={s.list}>
                    <li>
                        <div class={s.sign}>
                            <span>x</span>
                        </div>
                        <div class={s.text}>
                            <div class={s.tagAndAmount}>
                                <div>
                                    <span class={s.tag}>旅行</span>
                                    <span class={s.notes}>备注</span>
                                </div>
                                <span class={s.amount}>￥1234</span>
                            </div>
                            <div class={s.time}>2022-12-31 12:12</div>
                        </div>
                    </li>
                </ol>
                <div class={s.more}>往下滑动加载更多</div>
                <FloatButton iconName="add" />
            </div>
        )
    }
})