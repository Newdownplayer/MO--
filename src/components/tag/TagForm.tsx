import { defineComponent, reactive } from "vue";
import { Button } from "../../shared/Button";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Form, FormItem } from "../../shared/Form";
import { Rules, validate } from "../../shared/validate";
import s from './Tag.module.scss';
export const TagForm = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            name: '',
            sign: '',
        })
        const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
        const onsubmit = (e: Event) => {
            e.preventDefault();
            const rules: Rules<typeof formData> = [
                { key: 'name', type: 'required', message: '请输入标签名' },
                { key: 'name', type: 'pattern', regexp: /^.{1,4}$/, message: '长度在 1 到 4 个字符' },
                { key: 'sign', type: 'required', message: '请输入符号' },
            ]
            Object.assign(errors, {
                name: undefined,
                sign: undefined
            })
            Object.assign(errors, validate(formData, rules))
        }
        return () => (
            <Form onSubmit={onsubmit}>
                <FormItem label='标签名'
                    type="text"
                    v-model={formData.name}
                    error={errors['name'] ? errors['name'][0] : '　'} />
                <FormItem label={'符号 ' + formData.sign}
                    type="emojiSelect" v-model={formData.sign}
                    error={errors['sign'] ? errors['sign'][0] : '　'} />
                <FormItem>
                    <p class={s.tips}>记账时长按标签即可进行编辑</p>
                </FormItem>
                <FormItem>
                    <Button class={[s.button]}>确定</Button>
                </FormItem>
            </Form>
        )
    }
})