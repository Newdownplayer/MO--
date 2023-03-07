import { defineComponent, PropType } from "vue";

export type IconName = 'add' | 'clock' | 'chart' | 'cloud' | 'logo' | 'piggy' | 'menu' | 'statistics' | 'custom' | 'export' | 'remind' | 'left' | 'right' |
    'amusement' | 'bear' | 'car' | 'drink' | 'feeling' | 'game' | 'itemAdd' | 'kid' | 'salary' | 'smile' | 'baby' | 'ball' | 'bj' | 'bq' | 'img' | 'jb' | 'music' | 'notes' | 'sc' |
    'star' | 'study' | 'date'

export const Icon = defineComponent({
    props: {
        name: {
            type: String as PropType<IconName>,
            required: true
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>,
        }
    },
    setup: (props, context) => {
        return () => (
            <svg onClick={props.onClick}>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})