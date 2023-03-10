import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import { SkipFeatures } from "../../shared/SkipFeatures";
import s from "./WelcomeLayout.module.scss";

export const ThirdActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <SkipFeatures />
        <RouterLink to="/welcome/4">下一页</RouterLink>
        <SkipFeatures />
    </div>
}
ThirdActions.displayName = 'ThirdActions'