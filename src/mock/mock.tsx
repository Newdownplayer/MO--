import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';
type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');
export const mockItemSummary: Mock = (config) => {
    if (config.params.group_by === 'happen_at') {
        return [200, {
            groups: [
                { happen_at: '2023-02-18T00:00:00.000+0800', amount: 100 },
                { happen_at: '2023-02-22T00:00:00.000+0800', amount: 300 },
                { happen_at: '2023-02-21T00:00:00.000+0800', amount: 200 }],
            summary: 600
        }]
    } else {
        return [200, {
            groups: [
                { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
                { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
                { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }],
            summary: 600
        }]
    }
}
export const mockItemIndexBalance: Mock = (config) => {
    return [200, {
        expenses: 9900,
        income: 9900,
        balance: 0
    }]
}
export const mockItemIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 25
    const count = 26
    const createPaper = (page = 1) => ({ page, per_page, count, })
    const createTag = (attrs?: any) => ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
    })
    const createItem = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            user_id: createId(),
            amount: Math.floor(Math.random() * 10000),
            tags_id: [createId()],
            tags: [createTag()],
            happen_at: faker.date.past().toISOString(),
            kind: config.params.kind,
        }))
    const createBody = (n = 1, attrs?: any) => ({
        resources: createItem(n),
        pager: createPaper(page),
    })
    if (!page || page === 1) {
        return [200, createBody(25)]
    } else if (page === 2) {
        return [200, createBody(1)]
    } else {
        return [200, {}]
    }
}
export const mockTagEdit: Mock = config => {
    const createTag = (attrs?: any) => ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: 'expenses',
        ...attrs
    })
    return [200, { resource: createTag() }]
}
export const mockTagShow: Mock = (config) => {
    const createTag = (attrs?: any) =>
    ({
        id: createId(),
        name: faker.lorem.word(),
        sign: faker.internet.emoji(),
        kind: config.params.kind,
        ...attrs
    })
    return [200, { resource: createTag }]
}
export const mockItemCreate: Mock = config => {
    return [200, {
        resource: {
            "id": 2264,
            "user_id": 1312,
            "amount": 9900,
            "note": null,
            "tags_id": [3508],
            "happen_at": "2020-10-29T16:00:00.000Z",
            "created_at": "2022-07-03T15:35:56.301Z",
            "updated_at": "2022-07-03T15:35:56.301Z",
            "kind": "expenses"
        }
    }]
}
export const mockSession: Mock = (config) => {
    return [200, {
        jwt: faker.random.word()
    }]
}
let id = 0
const createId = () => {
    id += 1
    return id
}
export const mockTagIndex: Mock = (config) => {
    const { kind, page } = config.params
    const per_page = 19
    const count = 26
    const createPager = (page = 1) => ({
        page, per_page, count
    })
    const createTag = (n = 1, attrs?: any) =>
        Array.from({ length: n }).map(() => ({
            id: createId(),
            name: faker.lorem.word(),
            sign: faker.internet.emoji(),
            kind: config.params.kind,
            ...attrs
        }))
    const incomess = 9900
    const exportss = 10000
    const balances = incomess - exportss
    const createBody = (n = 1, attrs?: any) => ({
        resources: createTag(n),
        pager: createPager(page),
        summary: {
            income: incomess,
            export: exportss,
            balance: balances,
        }
    })
    if (kind === 'expenses' && (!page || page === 1)) {
        return [200, createBody(19)]
    } else if (kind === 'expenses' && page === 2) {
        return [200, createBody(7)]
    } else if (kind === 'incomes' && (!page || page === 1)) {
        return [200, createBody(19)]
    } else if (kind === 'incomes' && page === 2) {
        return [200, createBody(5)]
    } else {
        return [200, { resources: createTag(20) }]
    }
}