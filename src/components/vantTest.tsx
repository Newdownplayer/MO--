import { defineComponent, PropType, ref } from "vue";
import { DatePicker } from 'vant';
import { Button } from 'vant';
import { Calendar } from 'vant';
import { Popup, NumberKeyboard, Form, Field, CellGroup } from 'vant';

import 'vant/lib/index.css';
import { Time } from "../shared/time";
import { defineStore } from "pinia";
export const vantTest = defineComponent({

    props: {
        happenAt: {
            type: String as PropType<string>,
        },
    },

    setup: (props, context) => {
        const currentTime = ref(['12', '00']);
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { context.emit('update:happenAt', date.toISOString); hideDatePicker() }
        return () => (<>
            <span>
                <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
                <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                    <van-date-picker
                        v-modelValue='currentTime'
                        title="选择日期" onConfirm={setDate.toString} onCancel={hideDatePicker}
                    />
                </Popup>
            </span>
            <div>{currentTime}</div>
        </>
        )
    }
})
const useStore = defineStore('store', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})