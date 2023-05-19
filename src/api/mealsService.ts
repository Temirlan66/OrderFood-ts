import { FormSchema } from '../admin/pages/meals/MealModal'
import { Meal } from '../common/constants/types'
import { mainApi } from './intances'

type getAllMealsRepsonce = {
    data: Meal[]
}
const getAllMeals = () => {
    return mainApi.get<getAllMealsRepsonce>('foods')
}

type MealResponce = {
    data: Meal
}
const getMealById = (id: string) => {
    return mainApi.get<MealResponce>(`foods/${id}`)
}

const postAllMeals = (data: FormSchema) => {
    return mainApi.post('foods', data)
}

const udpateMeals = (id: string, values: FormSchema) => {
    return mainApi.put(`foods/${id}`, values)
}
const deleteMeals = (id: string) => {
    return mainApi.delete(`foods/${id}`)
}
export default {
    getAllMeals,
    getMealById,
    postAllMeals,
    udpateMeals,
    deleteMeals,
}
