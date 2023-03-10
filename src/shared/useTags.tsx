import { AxiosResponse } from "axios"
import { onMounted, ref } from "vue"

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>
export const useTags = (fetcher: Fetcher) => {
    const page = ref(0)
    const hasMore = ref(false)
    const tags = ref<Tag[]>([])
    const fetchTags = async () => {
        const response = await fetcher(page.value)
        const { resources, pager } = response.data
        tags.value = resources
        hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
        page.value += 1
    }
    // const delTags = async () => {
    //     const response = await fetcher(page.value)
    //     const { resources, pager } = response.data
    //     tags.value = resources
    //     page.value -= 1
    // }
    onMounted(fetchTags)
    return { page, tags, hasMore, fetchTags }
}