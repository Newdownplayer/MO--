import { defineComponent, onMounted, PropType, ref } from "vue";
import s from './Overlay.module.scss';
import { Icon } from "./Icon";
import { RouterLink, useRoute } from "vue-router";
import { Dialog } from "vant";
import { useMeStore } from "../stores/useMeStore";
export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props) => {
        const meStore = useMeStore()
        const close = () => { props.onClose?.() }
        const route = useRoute()
        const me = ref<User>()
        onMounted(async () => {
            const response = await meStore.mePromise
            me.value = response?.data.resource
        })
        const onSignOut = async () => {
            await Dialog.confirm({
                title: '确认',
                message: '确定要退出登录吗？'
            })
            localStorage.removeItem('jwt')
        }
        return () => <>
            <div class={s.mask} onClick={close}></div>
            <div class={s.overlay}>
                <section class={s.currentUser}>
                    {me.value ?
                        (<div>
                            <h2 class={s.email}>{me.value.email}</h2>
                            <div onClick={onSignOut}>点击退出登录</div>
                        </div>) :
                        (<RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                            <h2>未登录用户</h2>
                            <div>点击登录</div>
                        </RouterLink>)}
                </section>
                <nav>
                    <ul class={s.table}>
                        <li>
                            <RouterLink to="/statistics" class={s.action}>
                                <Icon name="statistics" class={s.icon}></Icon><span>统计图表</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/export" class={s.action}>
                                <Icon name="export" class={s.icon}></Icon><span>导出数据</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/tags/create" class={s.action}>
                                <Icon name="custom" class={s.icon}></Icon><span>自定义标签</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/notify" class={s.action}>
                                <Icon name="remind" class={s.icon}></Icon><span>记账提醒</span>
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    }
})
export const OverlayIcon = defineComponent({

    setup: () => {
        const refOverlayVisible = ref(false)
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
        }
        return () => <>
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
            {refOverlayVisible.value && <Overlay onClose={onClickMenu}></Overlay>}
        </>
    }
})