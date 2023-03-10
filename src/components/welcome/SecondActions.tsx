import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import { SkipFeatures } from "../../shared/SkipFeatures";
import s from "./WelcomeLayout.module.scss";

export const SecondActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <SkipFeatures class={s.fake}/>
        <RouterLink to="/welcome/3">下一页</RouterLink>
        <SkipFeatures />
    </div>
}
SecondActions.displayName = 'SecondActions'