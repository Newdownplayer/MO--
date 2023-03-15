import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { http } from "../shared/Http";

type MeTree = {
    me?: User,
    mePromise?: Promise<AxiosResponse<Resource<User>>>,
}
type MeActions = {
    refreshMe: () => void,
    fetchMe: () => void,
}
export const useMeStore = defineStore<string, MeTree, {}, MeActions>(('me'), {
    state: () => ({
        me: undefined,
        mePromise: undefined,
    }),
    actions: {
        refreshMe() {
            this.mePromise = http.get<Resource<User>>('/me')
        },
        fetchMe() {
            this.refreshMe()
        }
    }
})