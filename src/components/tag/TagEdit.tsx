import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { TagForm } from "./TagForm";
import s from './Tag.module.scss';
import { BackIcon } from "../../shared/BackIcon";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Dialog } from "vant";
export const TagEdit = defineComponent({
    setup: (props, context) => {
        const route = useRoute()
        const numberId = parseInt(route.params.id!.toString())
        if (Number.isNaN(numberId)) {
            return () => { <div>ID不存在</div> }
        }
        const onError = () => {
            Dialog.alert({
                title: '提示',
                message: '删除失败'
            })
        }
        const router = useRouter()
        const onDelete = async (options?: { withItems: boolean }) => {
            await http.delete(`/tags/${numberId}`, { with_items: options?.withItems ? 'true' : 'false' })
            await Dialog.confirm({
                title: '确认',
                message: '你真的要删除吗？'
            }).catch(onError)
            router.back()
        }
        return () => (
            <MainLayout>{{
                title: () => '编辑标签',
                icon: () => <>
                    <RouterLink to="/items" ><BackIcon class={s.navIcon} /></RouterLink>
                </>,
                default: () => (<>
                    <TagForm id={numberId} />
                    <div class={s.actions}>
                        <Button level="danger" class={s.removeTagsAndItems} onClick={() => onDelete({ withItems: true })} >删除标签（对应记账也会被删除）</Button>
                    </div>

                </>
                )
            }
            }</MainLayout >
        )
    }
})