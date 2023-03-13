import { defineComponent, PropType, ref } from "vue";
import { Icon } from "../../shared/Icon";
import s from './InputPad.module.scss';
import { DatePicker, Popup } from 'vant';
import { Time } from "../../shared/time";
export const InputPad = defineComponent({
    props: {
        happenAt: {
            type: String as PropType<string>,
        },
        amount: {
            type: Number as PropType<number>,
        },
        onSubmit: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props, context) => {
        const removeText = () => {
            refAmount.value = refAmount.value.slice(0, -1)
            if (refAmount.value.length === 0) {
                refAmount.value = '0'
            }
        }
        const buttons = [
            { text: '1', onClick: () => { appendText(1) } },
            { text: '2', onClick: () => { appendText(2) } },
            { text: '3', onClick: () => { appendText(3) } },
            { text: '4', onClick: () => { appendText(4) } },
            { text: '5', onClick: () => { appendText(5) } },
            { text: '6', onClick: () => { appendText(6) } },
            { text: '7', onClick: () => { appendText(7) } },
            { text: '8', onClick: () => { appendText(8) } },
            { text: '9', onClick: () => { appendText(9) } },
            { text: '0', onClick: () => { appendText(0) } },
            { text: '.', onClick: () => { appendText('.') } },
            { text: '删除', onClick: () => { removeText() } },
            { text: '清空', onClick: () => { refAmount.value = '0' } },
            {
                text: '提交', onClick: () => {
                    context.emit('update:amount', parseFloat(refAmount.value) * 100)
                    props.onSubmit?.()
                }
            },
        ]
        const refNote = ref("")
        const appendText = (n: number | string) => {
            const nString = n.toString()
            const dotIndex = refAmount.value.indexOf('.')
            if (refAmount.value.length >= 13) {
                return
            }
            if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
                return
            }
            if (nString === '.') {
                if (dotIndex >= 0) { // 已经有小数点了
                    return
                }
            } else if (nString === '0') {
                if (dotIndex === -1) { // 没有小数点
                    if (refAmount.value === '0') { // 没小数点，但是有0
                        return
                    }
                }
            } else {
                if (refAmount.value === '0') {
                    refAmount.value = ''
                }
            }
            refAmount.value += n.toString()
        }
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { context.emit('update:happenAt', date.toISOString); hideDatePicker() }
        const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')
        return () => (<>
            <div class={s.dateAndAmount}>
                <span class={s.date}>
                    <Icon name="date" class={s.navIcon} />
                    <span>
                        <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
                        <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                            <DatePicker v-modelValue={props.happenAt} title="选择年月日"
                                onConfirm={setDate.toString} onCancel={hideDatePicker}
                            />
                        </Popup>
                    </span>
                </span>
                <span class={s.amount}>{refAmount.value}</span>
            </div>
            <div class={s.buttons}>
                {buttons.map(button => <button onClick={button.onClick}>{button.text}</button>)}
            </div>
        </>
        )
    }
})