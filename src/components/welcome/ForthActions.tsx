import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import { SkipFeatures } from "../../shared/SkipFeatures";
import s from "./WelcomeLayout.module.scss";
const onClick = () => {
    localStorage.setItem('skipFeatures', 'yes')
}
export const ForthActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        <SkipFeatures class={s.fake} />
        <span onClick={onClick}>
            <RouterLink to="/start">开启记账之旅</RouterLink>
        </span>
        <SkipFeatures class={s.fake} />
    </div>
}
ForthActions.displayName = 'ForthActions'