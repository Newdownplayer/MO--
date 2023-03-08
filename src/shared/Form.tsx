import { DatePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { Button } from './Button';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Time } from './time';
export const Form = defineComponent({
    props: {
        onSubmit: {
            type: Function as PropType<(e: Event) => void>,
        }
    },
    setup: (props, context) => {
        return () => (
            <form class={s.form} onSubmit={props.onSubmit}>
                {context.slots.default?.()}
            </form>
        )
    }
})

export const FormItem = defineComponent({
    props: {
        label: {
            type: String
        },
        modelValue: {
            type: [String, Number]
        },
        type: {
            type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode'>,
        },
        error: {
            type: String
        },
        placeholder: {
            type: String
        },
    },
    emits: ['update:modelValue'],
    setup: (props, context) => {
        const refDateVisible = ref(false)
        const content = computed(() => {
            switch (props.type) {
                case 'text':
                    return <input
                        value={props.modelValue} placeholder={props.placeholder} class={[s.formItem, s.input]}
                        onInput={(e: any) => context.emit('update:modelValue', e.target.value)} />
                case 'emojiSelect':
                    return <EmojiSelect
                        modelValue={props.modelValue?.toString()} class={[s.form, s.emojiList, s.error]}
                        onUpdate:modelValue={(value: any) => context.emit('update:modelValue', value)} />
                case 'validationCode':
                    return <>
                        <input
                            value={props.modelValue} placeholder={props.placeholder} class={[s.formItem, s.input, s.validationCodeInput]} />
                        <Button class={s.validationCodeButton}>获取验证码</Button>
                    </>
                case 'date':
                    return <>
                        <input readonly={true} value={props.modelValue} placeholder={props.placeholder} class={[s.formItem, s.input]}
                            onClick={() => { refDateVisible.value = true }} />
                        <Popup position='bottom' v-model:show={refDateVisible.value}>
                            <DatePicker v-modelValue={props.modelValue} title="选择年月日"
                                onConfirm={(date: Date) => {
                                    context.emit('update:modelValue', new Time(date).format())
                                    refDateVisible.value = false
                                }}
                                onCancel={() => refDateVisible.value = false} />
                        </Popup></>
                case undefined:
                    return context.slots.default?.()
            }
        })
        return () => {
            return <div class={s.formRow}>
                <label class={s.formLabel}>
                    {props.label &&
                        <span class={s.formItem_name}>{props.label}</span>
                    }
                    <div class={s.formItem_value}>
                        {content.value}
                    </div>
                    <div class={s.formItem_errorHint}>
                        <span>{props.error ?? '　'}</span>
                    </div>
                </label>
            </div>
        }
    }
})