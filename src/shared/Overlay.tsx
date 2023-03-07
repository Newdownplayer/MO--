import { defineComponent, PropType, ref } from "vue";
import s from './Overlay.module.scss';
import { Icon } from "./Icon";
import { RouterLink } from "vue-router";
export const Overlay = defineComponent({
    props: {
        onClose: {
            type: Function as PropType<() => void>
        }
    },
    setup: (props, context) => {
        const close = () => {
            props.onClose?.()
        }
        const onClickSignIn = () => {
            console.log("登录");

        }
        return () => <>
            <div class={s.mask} onClick={close}></div>
            <div class={s.overlay}>
                <section class={s.currentUser}>
                    <h2 onClick={onClickSignIn}>未登录用户</h2>
                    <div onClick={onClickSignIn}>点击登录</div>
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

    setup: (props, context) => {
        const refOverlayVisible = ref(false)
        const onclick = () => {
            console.log("hi");
        }
        const onClickMenu = () => {
            refOverlayVisible.value = !refOverlayVisible.value
        }
        return () => <>
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
            {refOverlayVisible.value && <Overlay onClose={onClickMenu}></Overlay>}
        </>
    }
})