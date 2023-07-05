import { useState, useEffect, forwardRef, useRef } from 'react';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, useGridApiRef } from '@mui/x-data-grid';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';

import CustomHeader from './SubComponents/CustomHeader';



export const CustomGrid = forwardRef(({ rows, columns, onSelectRow, pageSize = 10, ...others }, ref) => {

    const [_rows, setRows] = useState(rows);
    const [filteredRows, setFilteredRows] = useState([])
    const [_columns, setColumns] = useState(columns);

    const pageSizeOptions = [8, 10, 12, 15, 20, 30]
    const apiRef = useGridApiRef("");

    useEffect(() => {
        if (!isEmpty(others?.apiRef?.current)) {
            apiRef.current = others.apiRef.current;
        }
    }, [others.apiRef])

    useEffect(() => {

        setRows(rows)
        setFilteredRows(rows)
    }, [rows]);

    useEffect(() => {
        processCols(columns)
    }, [columns, _rows])

    //-------------------------------------------------------------------

    const filterGrid = (searchPatternArr, idx) => {
        //filter depending on all search pattern for each column filter
        const filteredData = _rows.filter((item, idx) => {
            return searchPatternArr.every(el => {
                if (!el || !el?.value) return true;
                const { field } = el.col
                let cellData = item[field];
                if (typeof el?.col?.valueGetter === 'function') {
                    cellData = el.col.valueGetter({ row: item });
                }
                return cellData.toUpperCase().includes(el?.value?.toUpperCase())

            });
        })
        setFilteredRows(filteredData);
    }

    function onSortingChanged(mode, colIdx) {
        const cols = apiRef.current.getAllColumns()
        apiRef.current.sortColumn(cols[colIdx], mode)

    }



    const processCols = (cols) => {
        const _cols = cols.map((col, idx) => {
            if (col.type === 'checkboxSelection') {
                col = {
                    ...GRID_CHECKBOX_SELECTION_COL_DEF,
                    ...col,
                }
            }
            col.filterGrid = filterGrid
            col.onSortingChanged = onSortingChanged;
            return col;
        });

        setColumns(_cols);
    }





    return (
        <Box height={{ height: filteredRows?.length == 0 ? '100px' : 'auto' }}>
            <DataGrid
                columns={_columns}
                rows={filteredRows || []}
                slots={{
                    columnHeaders: CustomHeader
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize } }
                }}
                apiRef={apiRef}
                pageSizeOptions={pageSizeOptions}
                {...others}
            />
        </Box>
    )
})

CustomGrid.displayName = 'CustomGrid';

export default CustomGrid;