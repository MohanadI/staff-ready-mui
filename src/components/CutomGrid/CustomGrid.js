import { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import gridData from './Data';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';


// function subjectApplyQuckFilterFn(value) {

//     return (params) => {
//         return params.value === value;
//     }
// }

// function classificationApplyQuickFilterFn(value) {

//     return (params) => {
//         return params.value === value;
//     }
// }

// function customHeader(params) {
//     let colHeader = ''

//     switch (params.field) {
//         case 'id':
//             colHeader = 'Classification';
//             break;
//         case 'subject':
//             colHeader = 'Subject';
//             break;

//         case 'description':
//             colHeader = 'Description';
//             break;
//         case 'name':
//             colHeader = 'Document Name';
//     }

//     return <Box sx={{
//         display: 'flex',
//         flexFlow: 'column',
//         alignItems: 'center',
//     }}>
//         <Box>
//             {colHeader}
//         </Box>

//         <TextField size='small' sx={{ height: '20px' }} />
//     </Box>
// }

export const CustomGrid = (props) => {

    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([])
    const [columns, setColomuns] = useState([]);

    useEffect(() => {

        const _rows = cloneDeep(props.rows)
        _rows.unshift({ isFilterRow: true, id: 'filterRow' })

        setRows(_rows)
        setFilteredRows(_rows)
    }, [props.rows]);

    useEffect(() => {
        manpulateColumns(props.columns)
    }, [rows])

    //-------------------------------------------------------------------

    const filterGrid = (e, params) => {
        // console.log(rows, filteredRows);
        const { labelField } = params.colDef
        const { field } = params;
        const searchPattern = e.target.value;
        const filterdData = rows.filter((item, idx) => {
            if (idx === 0) return true;

            let cellData = item[field]
            if (labelField && isObject(item[field])) {
                const labelProps = labelField.split('.');
                cellData = labelProps.reduce((acc, curr) => acc[curr], cellData);
            }

            return cellData.includes(searchPattern)
        })

        setFilteredRows(filterdData);
    }

    function renderCell(params) {
        const { col, idx, outerRenderCell } = this;
        if (params.row?.isFilterRow) {
            return (
                <TextField key={idx} size='small' placeholder='search' onChange={(e) => filterGrid(e, params)} />
            )
        }

        let value = params.value
        if (col.labelField && isObject(value)) {
            const propsLabel = col.labelField.split('.');
            value = propsLabel.reduce((acc, curr) => acc[curr], params.value)
        }

        return outerRenderCell ? outerRenderCell(params) : <div key={idx}>{value}</div>
    }

    const manpulateColumns = (cols) => {
        const _cols = cols.map((col, idx) => {
            const outerRenderCell = col.renderCell ? col.renderCell : '';
            col.renderCell = renderCell.bind({ col, idx, outerRenderCell })
            return col;
        });

        setColomuns(_cols);
    }

    return (
        <Box sx={{
            // '& .grid-header': {
            //     height: '100% !important'
            // }
        }}>
            <DataGrid
                columns={columns}
                rows={filteredRows}
            />


        </Box>
    )
}

export default CustomGrid;