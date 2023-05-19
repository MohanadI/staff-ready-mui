import { useState, useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import CustomHeader from './SubComponents/CustomHeader';



export const CustomGrid = ({ rows, columns, ...others }) => {

    const [_rows, setRows] = useState(rows);
    const [filteredRows, setFilteredRows] = useState([])
    const [_columns, setColumns] = useState(columns);

    const apiRef = useGridApiRef();

    useEffect(() => {

        setRows(rows)
        setFilteredRows(rows)
    }, [rows]);

    useEffect(() => {
        processCols(columns)
    }, [columns])

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
            col.filterGrid = filterGrid
            col.onSortingChanged = onSortingChanged;
            return col;
        });

        setColumns(_cols);
    }





    return (
        <Box>
            <DataGrid
                columns={_columns}
                rows={filteredRows}
                slots={{
                    columnHeaders: CustomHeader
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 12 } }
                }}
                apiRef={apiRef}
                {...others}
            />
        </Box>
    )
}

export default CustomGrid;