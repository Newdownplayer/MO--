import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from '../../shared/Icon';
import { TagForm } from "./TagForm";
import s from './Tag.module.scss';
export const TagEdit = defineComponent({
    setup: (props, context) => {
        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <Icon name="left" onClick={() => { <RouterLink to='/start' /> }} />,
                default: () => (<>
                    <TagForm />
                    <div class={s.actions}>
                        <Button level="danger" class={s.removeTags} onClick={() => ({})} > 删除标签</Button>
                        <Button level="danger" class={s.removeTagsAndItems} onClick={() => ({})} >删除标签和记账</Button>
                    </div>

                </>
                )
            }
            }</MainLayout >
        )
    }
})