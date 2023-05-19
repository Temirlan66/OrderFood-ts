import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'
import { Column } from '../../common/constants/types'
import { useClientSidePagination } from '../../hooks/useClientSidePagination'

type Props<T> = {
    columns: Column<T>[]
    rows: T[]
    getUniqueId: (val: T) => string
    withPaganation?: boolean
}

const AppTable = <T,>({
    columns,
    rows,
    getUniqueId,
    withPaganation = true,
}: Props<T>) => {
    const {
        page,
        rowsPerPage,
        handlerChangePage,
        handlerChangeRowPerPage,
        paginate,
    } = useClientSidePagination()
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={`header-${column.key}`}
                                    align={column.align || 'left'}
                                    style={
                                        column.minWidth
                                            ? {
                                                  minWidth: column.minWidth,
                                              }
                                            : {}
                                    }
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginate(rows).map((row, rowIndex) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={getUniqueId(row)}
                                >
                                    {columns.map((column) => {
                                        if (column.render) {
                                            return (
                                                <TableCell key={column.key}>
                                                    {column.render(row)}
                                                </TableCell>
                                            )
                                        }
                                        const value = column.index
                                            ? rowIndex + 1
                                            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                              //@ts-ignore
                                              row[column.key]
                                        return (
                                            <TableCell
                                                key={`row-${column.key}`}
                                                align={column.align || 'left'}
                                            >
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {withPaganation && (
                <TablePagination
                    rowsPerPageOptions={[2, 4]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => handlerChangePage(newPage)}
                    onRowsPerPageChange={handlerChangeRowPerPage}
                />
            )}
        </Paper>
    )
}

export default AppTable
