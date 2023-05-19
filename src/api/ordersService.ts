import { MealType } from '../common/constants/types'
import { mainApi } from './intances'

type ordersResponse = {
    data: MealType[]
}

const postOrder = (totalPrice: { totalPrice: number }) => {
    return mainApi.post('orders', totalPrice)
}
const getAllOrder = () => {
    return mainApi.get<ordersResponse>('orders/all')
}

const getOrder = () => {
    return mainApi.get<ordersResponse>('orders')
}

export default { getAllOrder, getOrder, postOrder }
