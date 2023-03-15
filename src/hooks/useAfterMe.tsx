import { onMounted } from "vue"
import { useMeStore } from "../stores/useMeStore"

export const useAfterMe = (fn: () => void) => {
    const meStore = useMeStore()
    onMounted(async () => {
        try { await meStore.mePromise }
        catch (e) { return }
        fn()
    })
}
