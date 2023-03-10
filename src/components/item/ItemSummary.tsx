import { defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { Button } from "../../shared/Button";
import { Center } from "../../shared/Center";
import { DateTime } from "../../shared/DateTime";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Money } from "../../shared/Money";
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
        const items = ref<Item[]>([])
        const hasMore = ref(false)
        const page = ref(0)
        const fetchItems = async () => {
            if (!props.startDate || !props.endDate) { return }
            const response = await http.get<Resources<Item>>('/items', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                page: page.value + 1,
            }, {
                _mock: 'itemIndex',
            })
            const { resources, pager } = response.data
            items.value?.push(...resources)
            hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
            page.value += 1
        }
        onMounted(fetchItems)
        watch(() => [props.startDate, props.endDate], () => {
            items.value = []
            hasMore.value = false
            page.value = 0
            fetchItems()
        })
        const itemsBalance = reactive({
            expenses: 0, income: 0, balance: 0
        })
        const fetchItemsBalance = async () => {
            if (!props.startDate || !props.endDate) { return }
            const response = await http.get('/items/balance', {
                happen_after: props.startDate,
                happen_before: props.endDate,
                page: page.value + 1,
            }, {
                _mock: 'itemIndexBalance',
            })
            Object.assign(itemsBalance, response.data)
        }
        onMounted(fetchItemsBalance)
        watch(() => [props.startDate, props.endDate], () => {
            Object.assign(itemsBalance, { expenses: 0, income: 0, balance: 0 })
            fetchItemsBalance()
        })
        return () => (
            <div class={s.wrapper}>
                {items.value && items.value.length > 0 ? (
                    <>
                        <ul class={s.total}>
                            <li>
                                <span>??????</span>
                                <Money value={itemsBalance.income} />
                            </li>
                            <li>
                                <span>??????</span>
                                <Money value={itemsBalance.expenses} />
                            </li>
                            <li>
                                <span>?????????</span>
                                <Money value={itemsBalance.balance} />
                            </li>
                        </ul>
                        <ol class={s.list}>
                            {items.value.map((item) => (
                                <li>
                                    <div class={s.sign}>
                                        <span>{item.tags![0].sign}</span>
                                    </div>
                                    <div class={s.text}>
                                        <div class={s.tagAndAmount}>
                                            <span class={s.tag}>{item.tags![0].name}</span>
                                            <span class={s.do}>???</span>
                                            <span class={s.amount}><Money value={item.amount} /></span>
                                        </div>
                                        <div class={s.time}><DateTime value={item.happen_at} /></div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div class={s.more}>
                            {hasMore.value ?
                                <Button onClick={fetchItems}>????????????</Button> :
                                <span>????????????</span>
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <Center>
                            <Icon name='logo' class={s.logo} />
                        </Center>
                        <div class={s.button_wrapper}>
                            <RouterLink to="/items/create">
                                <Button class={s.button}>????????????</Button>
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