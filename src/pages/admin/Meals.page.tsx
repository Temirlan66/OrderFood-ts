import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Button, Grid, IconButton } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import MealModal, { FormSchema } from '../../admin/pages/meals/MealModal'
import { Column, Meal } from '../../common/constants/types'
import AppTable from '../../components/UI/Table'
import {
    deleteMeals,
    getAllMeals,
    updateMeals,
} from '../../store/meals/meals.thunk'
import { AppDispatch, RootState } from '../../store/store'
const Meals = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [params, setParams] = useSearchParams()
    // const [isModalOpen, setModalOpen] = useState(false)
    const meals = useSelector((state: RootState) => state.meals.items)

    useEffect(() => {
        dispatch(getAllMeals())
    }, [])

    const deleteMealsHandler = (id: string) => {
        dispatch(deleteMeals(id))
    }

    const editMealsHandler = (id: string) => {
        params.set('mealId', id)
        setParams(params)
        showModalHandler('edit')
    }
    const columns: Column<Meal>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Title',
            key: 'title',
        },
        {
            header: 'Price',
            key: 'price',
        },
        {
            header: 'Description',
            key: 'description',
        },
        {
            header: 'Actions',
            key: 'actions',
            render: (meal: Meal) => (
                <Grid>
                    <IconButton onClick={() => editMealsHandler(meal._id)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteMealsHandler(meal._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            ),
        },
    ]

    const saveHandler = (values: FormSchema, id: string) => {
        dispatch(updateMeals({ id, values })).then(() => closeModalHandler())
    }

    const showModalHandler = (mode: 'add' | 'edit') => {
        params.set('modal', mode)
        setParams(params)
    }
    const closeModalHandler = () => {
        params.delete('modal')
        setParams(params)
    }

    const isModalOpen = !!params.get('modal')
    return (
        <Grid>
            <Button variant="contained" onClick={() => showModalHandler('add')}>
                Add new meal
            </Button>

            <MealModal
                open={isModalOpen}
                onClose={closeModalHandler}
                submit={saveHandler}
            />
            <Grid>
                <AppTable
                    columns={columns}
                    rows={meals}
                    getUniqueId={(val) => val._id}
                />
            </Grid>
        </Grid>
    )
}

export default Meals
