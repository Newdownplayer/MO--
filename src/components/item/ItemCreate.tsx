import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    setup: (props, context) => {
        const refKind = ref('支出')
        const refExpenseTags = ref([
            { id: 1, name: '餐饮', sign: '￥', category: 'expense' },
            { id: 2, name: '交通', sign: '￥', category: 'expense' },
        ])
        const refIncomeTags = ref([
            { id: 1, name: '工资', sign: '￥', category: 'income' },
            { id: 2, name: '加班费', sign: '￥', category: 'income' },

        ])
        return () => (
            <MainLayout>{
                {
                    title: () => '记一笔',
                    icon: () => <Icon name="left" class={s.navIcon} />,
                    default: () => <>
                        <div class={s.wrapper}>
                            <Tabs v-model:selected={refKind.value} class={s.tabs}>
                                <Tab name="支出" class={s.tags_wrapper}>
                                    <div class={s.tag}>
                                        <div class={s.sign}>
                                            <Icon name="add" class={s.createTag} />
                                        </div>
                                        <div class={s.name}>
                                            新增
                                        </div>
                                    </div>
                                    {refExpenseTags.value.map(tag =>
                                        <div class={[s.tag, s.selected]}>
                                            <div class={s.sign}>
                                                {tag.sign}
                                            </div>
                                            <div class={s.name}>
                                                {tag.name}
                                            </div>
                                        </div>
                                    )}
                                </Tab>
                                <Tab name="收入" class={s.tags_wrapper}>
                                    <div class={s.tag}>
                                        <div class={s.sign}>
                                            <Icon name="add" class={s.createTag} />
                                        </div>
                                        <div class={s.name}>
                                            新增
                                        </div>
                                    </div>
                                    {refIncomeTags.value.map(tag =>
                                        <div class={[s.tag, s.selected]}>
                                            <div class={s.sign}>
                                                {tag.sign}
                                            </div>
                                            <div class={s.name}>
                                                {tag.name}
                                            </div>
                                        </div>
                                    )}
                                </Tab>
                            </Tabs>
                            <div class={s.inputPad_wrapper}>
                                <InputPad />
                            </div>
                        </div>
                    </>
                }
            }</MainLayout>
        )
    }
})