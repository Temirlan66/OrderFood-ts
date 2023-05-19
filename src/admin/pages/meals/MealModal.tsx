import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Modal, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as zod from 'zod'
import mealsService from '../../../api/mealsService'
import useAppDispatch from '../../../hooks/useAppDispatch'
import { AddMeals } from '../../../store/meals/meals.thunk'

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #3a8ce3',
    boxShadow: 24,
    p: 4,
}

const schema = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
})
export type FormSchema = (typeof schema)['_output']

type Props = {
    open: boolean
    submit: (values: FormSchema, id: string) => void
    onClose: () => void
}

const MealModal = ({ open, onClose, submit }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            price: 0,
            title: '',
            description: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        const mealId = searchParams.get('mealId')

        if (open && searchParams.get('modal') === 'edit' && mealId) {
            mealsService.getMealById(mealId).then(({ data }) => {
                reset(data.data)
            })
        }
    }, [open])

    const submitHandler = (values: FormSchema) => {
        const id = searchParams.get('mealId' || '1')

        open && searchParams.get('modal') === 'edit'
            ? submit(values, id)
            : dispatch(AddMeals(values)).then(() => {
                  onClose()
              })
    }
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Container>
                        <StyledText
                            id="title"
                            error={!!errors.title}
                            {...register('title')}
                            label="Title"
                        />
                        <StyledText
                            id="description"
                            error={!!errors.description}
                            {...register('description')}
                            label="Description"
                        />
                        <StyledText
                            id="price"
                            type="number"
                            error={!!errors.price}
                            {...register('price', { valueAsNumber: true })}
                            label="Price"
                        />
                        <BtnContainer color="info" onClick={onClose}>
                            Cancel
                        </BtnContainer>
                        <BtnContainer type="submit" color="primary">
                            Save
                        </BtnContainer>
                    </Container>
                </form>
            </Box>
        </Modal>
    )
}

const StyledText = styled(TextField)(() => ({
    marginRight: '10px',
    background: '#fff3f3',
    width: '350px',
    marginBottom: '12px',
}))
const Container = styled('div')(() => ({
    gap: '20px',
    marginBottom: '12px',
}))
const BtnContainer = styled('button')(() => ({
    gap: '120px',
    width: '100px',
    height: '40px',
    color: 'white',
    marginLeft: '12px',
    background: '#2091d3',
    border: 'none',
    borderRadius: '20px',
    fontSize: '10px',
}))
export default MealModal
