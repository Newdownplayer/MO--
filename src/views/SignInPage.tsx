import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { hasError, validate } from "../shared/validate";
import s from './SignInPage.module.scss';
import { http } from "../shared/Http";
import { useBool } from "../hooks/useBool";
import { useRoute, useRouter } from "vue-router";
import { BackIcon } from "../shared/BackIcon";
import { useMeStore } from "../stores/useMeStore";
export const SignInPage = defineComponent({
    setup: (props, context) => {
        const meStore = useMeStore()
        const formData = reactive({
            email: '1119312377@qq.com',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const refValkidationCode = ref<any>('')
        const { ref: refDisabled, toggle, on, off } = useBool(false)
        const router = useRouter()
        const route = useRoute()
        const onSubmit = async (e: Event) => {
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
            if (!hasError(errors)) {
                const response = await http.post<{ jwt: string }>('/session', formData, { _autoLoading: true }).catch(onError)
                localStorage.setItem('jwt', response.data.jwt)
                const returnTo = route.query.return_to?.toString()
                meStore.refreshMe()
                router.push(returnTo || '/')
            }
        }
        const onError = (error: any) => {
            if (error.response.status === 422) {
                Object.assign(errors, error.response.data.errors)
            }
            throw error
        }
        const onClickSendValitionCode = async () => {
            on()
            await http.post('/validation_codes', { email: formData.email }, { _autoLoading: true }).catch(onError).finally(off)
            //成功
            refValkidationCode.value.startCount()
        }
        return () => (
            <MainLayout>{{
                title: () => '登录',
                icon: () => <BackIcon />,
                default: () => (<>
                    <Center class={s.center}>
                        <Icon name='logo' class={s.logo} />
                        <h1>MO记账</h1>
                    </Center>
                    <Form onSubmit={onSubmit}>
                        <FormItem label="邮箱地址" type="text" placeholder="请输入邮箱地址" v-model={formData.email} error={errors.email?.[0]}></FormItem>
                        <FormItem label="验证码" disabled={refDisabled.value} type="validationCode" countFrom={60} ref={refValkidationCode} placeholder="请输入验证码" v-model={formData.code} error={errors.code?.[0]}
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