import { defineComponent, PropType } from "vue";
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
        },
    },
    emits: ['update:selected'],
    setup: (props, context) => {
        return () => {
            const tabs = context.slots.default?.()
            if (!tabs) return () => null
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].type !== Tab) {
                    throw new Error('<Tabs>的子组件必须是<Tab>')
                }
            }
            return <div class={s.tabs}>
                <ol class={s.tabs_nav}>
                    {tabs.map(item =>
                        <li class={item.props?.name === props.selected ? s.selected : ''}
                            onClick={() => context.emit('update:selected', item.props?.name)}
                        >
                            {item.props?.name}
                        </li>)}
                </ol>
                <div >
                    {tabs.map(item =>
                        <div v-show={item.props?.name === props.selected}>{item}</div>
                    )}
                </div>
            </div >
        }
    }
})

export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    setup: (props, context) => {
        return () => (
            <div>{context.slots.default?.()}</div>
        )
    }
})