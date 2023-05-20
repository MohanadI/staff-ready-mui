import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import cloneDeep from 'lodash/cloneDeep';
import React, { forwardRef, useEffect, useState } from 'react';
import SortingComp from './SortingComp';


const CustomHeader = forwardRef((props, ref) => {

    const [searchPatternArr, setSearchPatternArr] = useState([]);
    const [isActiveSort, setIsActiveSort] = useState([]);


    const { visibleColumns } = props

    useEffect(() => {
        const _isActiveSort = visibleColumns.map(() => false)
        setIsActiveSort(_isActiveSort)
    }, [])


    function onSortingChanged(mode, col, colIdx) {
        col?.onSortingChanged?.(mode, colIdx)
        const _isActiveSort = isActiveSort.map((item, idx) => {
            return idx === colIdx
        })
        setIsActiveSort(_isActiveSort)
    }


    return (
        <Box
            className="custom-header-wrapper MuiDataGrid-withBorderColor"
            sx={{ display: 'flex', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
        >
            {visibleColumns?.map((col, idx) => {
                return (
                    <Box
                        // className="MuiDataGrid-cell"
                        sx={{ flex: col.flex, m: 1 }}
                        key={idx}
                    >
                        <Grid container>
                            <Grid item md={6}>
                                <Box sx={{ fontWeight: 'bold', pb: 2, pt: 1 }}>{col.headerName}</Box>

                            </Grid>

                            <Grid item md={6}>
                                <SortingComp
                                    onSortingChanged={(mode) => onSortingChanged(mode, col, idx)}
                                    isActive={isActiveSort[idx]}

                                />
                            </Grid>

                        </Grid>
                        <TextField value={searchPatternArr[idx]?.value} size='small' sx={{ width: '100%' }} placeholder='search' onChange={(e) => {
                            const _searchArr = cloneDeep(searchPatternArr);
                            _searchArr[idx] = { value: e.target.value, col: col }
                            setSearchPatternArr(_searchArr)
                            col.filterGrid(_searchArr, idx)


                        }} />

                    </Box>
                )
            })}
        </Box >
    )

})


export default CustomHeader;