import { defineStore } from 'pinia'
import { http } from '../shared/Http'

type State = {
    items: Item[]
    hasMore: boolean
    page: number
}
type Actions = {
    fetchItems: (startDate?: string, endDate?: string) => void
    fetchNextPage: (startDate?: string, endDate?: string) => void
    _fetch: (startDate?: string, endDate?: string, firstPage?: boolean) => void
}
export const useItemStore = (id: string | string[]) =>
    defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
        state: () => ({
            items: [],
            hasMore: false,
            page: 0
        }),
        actions: {
            async _fetch(startDate, endDate, firstPage) {
                if (!startDate || !endDate) {
                    return
                }
                const response = await http.get<Resources<Item>>(
                    '/items',
                    {
                        happen_after: startDate,
                        happen_before: endDate,
                        page: firstPage ? 1 : this.page + 1
                    },
                    {
                        _mock: 'itemIndex',
                        _autoLoading: true
                    }
                )
                const { resources, pager } = response.data
                firstPage ? this.items = resources : this.items?.push(...resources)
                this.hasMore = (pager.page - 1) * pager.per_page + resources.length < pager.count
                this.page += 1
            },
            async fetchNextPage(startDate, endDate) {
                this._fetch(startDate, endDate, false)
            },
            async fetchItems(startDate, endDate) {
                this._fetch(startDate, endDate, true)
            }
        }
    })()