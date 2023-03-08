import { defineComponent, reactive } from "vue";
import axios from 'axios';
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            email: '',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const onSubmit = (e: Event) => {
            e.preventDefault();
            Object.assign(errors, {
                email: [],
                code: []
            })
            Object.assign(errors, validate(formData, [
                { key: 'email', type: 'required', message: '请输入邮箱地址' },
                { key: 'email', type: 'pattern', regexp: /^.+@.+$/, message: '请输入正确的邮箱地址' },
                { key: 'code', type: 'required', message: '请输入验证码' },
                { key: 'code', type: 'pattern', regexp: /^\d{6}$/, message: '请输入正确的验证码' },
            ]))
        }
        const onClickSendValitionCode = async () => {
            const response = await axios.post('/api/v1/validdation_codes', { email: formData.email })
            console.log(response)
        }
        return () => (
            <MainLayout>{{
                title: () => '登录',
                icon: () => <Icon name='left'></Icon>,
                default: () => (<>
                    <Center class={s.center}>
                        <Icon name='logo' class={s.logo} />
                        <h1>MO记账</h1>
                    </Center>
                    <Form onSubmit={onSubmit}>
                        <FormItem label="邮箱地址" type="text" placeholder="请输入邮箱地址" v-model={formData.email} error={errors.email?.[0]}></FormItem>
                        <FormItem label="验证码" type="validationCode" placeholder="请输入验证码" v-model={formData.code} error={errors.code?.[0]}
                            onClick={onClickSendValitionCode}
                        ></FormItem>
                        <FormItem style={{ paddingTop: '48px' }}>
                            <Button type="submit">登录</Button>
                        </FormItem>
                    </Form>
                </>)
            }}</MainLayout>
        )
    }
})