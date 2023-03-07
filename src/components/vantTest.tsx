import { defineComponent, PropType, ref } from "vue";
import { DatePicker } from 'vant';
import { Button } from 'vant';
import { Calendar } from 'vant';
import { Popup, NumberKeyboard, Form, Field, CellGroup } from 'vant';

import 'vant/lib/index.css';
import { Time } from "../shared/time";

export const vantTest = defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
        },
    },
    components: {
        [Button.name]: Button,
        [Calendar.name]: Calendar,
        [DatePicker.name]: DatePicker,
        [Popup.name]: Popup,
        [NumberKeyboard.name]: NumberKeyboard,
        [Form.name]: Form,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
    },
    setup: (props, context) => {
        const refshow = ref(false)
        const refTime = ref(false)
        const now = new Date()
        const refDate = ref<Date>(now)
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        const showKeyboard = () => {
            if (refshow.value) {
                refshow.value = false
            } else {
                refshow.value = true
            }
        }
        const showTime = () => {
            if (refTime.value) {
                refTime.value = false
            } else {
                refTime.value = true
            }
        }
        return () => (<>

            <van-button type="danger">危险按钮</van-button>
            <van-button plain type="success">朴素按钮</van-button>
            <van-button type="info">信息按钮</van-button>
            <van-button onClick={showKeyboard}>弹出默认键盘</van-button>
            <van-number-keyboard show={refshow.value} />
            <van-button onClick={showTime}>自定义时间</van-button>
            <Popup v-model={refTime.value}>
                <DatePicker v-modelValue={refDate.value} title="选择年月日"
                />
            </Popup>
            <span onClick={showDatePicker}>{new Time(refDate.value).format()}</span>
            <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                <DatePicker v-modelValue={refDate.value} title="选择年月日"
                    onConfirm={setDate} onCancel={hideDatePicker}
                />
            </Popup>
        </>
        )
    }
})