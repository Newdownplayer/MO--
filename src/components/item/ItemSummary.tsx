import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useAfterMe } from "../../hooks/useAfterMe";
import { Button } from "../../shared/Button";
import { Center } from "../../shared/Center";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Money } from "../../shared/Money";
import { useItemStore } from "../../stores/useItemStore";
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false,
        },
        endDate: {
            type: String as PropType<string>,
            required: false,
        },
    },
    setup: (props, context) => {
        const itemStore = useItemStore(['items', props.startDate, props.endDate])
        useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))
        watch(
            () => [props.startDate, props.endDate],
            () => {
                itemStore.$reset()
                itemStore.fetchItems()
            })
        const itemsBalance = reactive({ expenses: 0, income: 0, balance: 0 })
        const fetchItemsBalance = async () => {
            if (!props.startDate || !props.endDate) { return }
            const response = await http.get(
                '/items/balance',
                {
                    happen_after: props.startDate,
                    happen_before: props.endDate
                },
                {
                    _mock: 'itemIndexBalance'
                }
            )
            Object.assign(itemsBalance, response.data)
        }
        useAfterMe(fetchItemsBalance)
        watch(
            () => [props.startDate, props.endDate],
            () => {
                itemStore.$reset()
                itemStore.fetchItems(props.startDate, props.endDate)
            }
        )

        return () =>
            !props.startDate || !props.endDate
                ? (<div>请先选择时间范围</div>)
                : (
                    <div class={s.wrapper}>
                        {itemStore.items && itemStore.items.length > 0
                            ? (<>
                                <ul class={s.total}>
                                    <li>
                                        <span>收入</span>
                                        <Money value={itemsBalance.income} />
                                    </li>
                                    <li>
                                        <span>支出</span>
                                        <Money value={itemsBalance.expenses} />
                                    </li>
                                    <li>
                                        <span>净收入</span>
                                        <Money value={itemsBalance.balance} />
                                    </li>
                                </ul>
                                <ol class={s.list}>
                                    {itemStore.items.map((item) => (
                                        <li>
                                            <div class={s.sign}>
                                                <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                                            </div>
                                            <div class={s.text}>
                                                <div class={s.tagAndAmount}>
                                                    <span class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                                                    <span class={s.do}>￥</span>
                                                    <span class={s.amount}><Money value={item.amount} /></span>
                                                </div>
                                                <div class={s.time}><DateTime value={item.happen_at} /></div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <div class={s.more}>
                                    {itemStore.hasMore
                                        ? <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
                                        : <span>没有更多</span>
                                    }
                                </div>
                            </>)
                            : (
                                <>
                                    <Center direction="|">
                                        <Icon name='logo' class={s.logo} />
                                        <p class={s.noData}>目前没有数据</p>
                                    </Center>
                                    <div class={s.button_wrapper}>
                                        <RouterLink to="/items/create">
                                            <Button class={s.button}>开始记账</Button>
                                        </RouterLink>
                                    </div>
                                </>
                            )}
                        <RouterLink to='/items/create'>
                            <FloatButton iconName='add' />
                        </RouterLink>
                    </div>
                )
    },
})