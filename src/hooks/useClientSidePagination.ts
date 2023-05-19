import { ChangeEvent, useState } from 'react'

export const useClientSidePagination = () => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowPerPage] = useState(0)
    const handlerChangePage = (newPage: number) => {
        setPage(newPage)
    }

    const handlerChangeRowPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowPerPage(+event.target.value)
    }

    const paginate = <T>(rows: T[]) => {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }
    return {
        page,
        rowsPerPage,
        handlerChangePage,
        handlerChangeRowPerPage,
        paginate,
    }
}
