export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export type SignInUser = {
    email: string
    password: string
}

export type SignUpUser = {
    name: string
    email: string
    password: string
    confirm: string
    role: string
}

export interface Meal {
    readonly _id: string
    price: number
    title: string
    amount: number
    description: string
}

export type Column<T> = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'right' | 'center'
    index?: boolean
    render?: (meal: T) => JSX.Element
}

type ItemType = {
    _id: string
    title: string
    amount: number
    price: number
}
export type MealType = {
    createdAt: string
    items: ItemType[]
    totalPrice: number
    user: {
        _id: string
        name: string
    }
    readonly _id: string
}

export type udpateData = {
    id: string
    values: {
        price: number
        title: string
        description: string
    }
}

export type basketData = {
    id: string
    price: number
    title: string
    amount: number
}
