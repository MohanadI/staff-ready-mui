import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import cloneDeep from 'lodash/cloneDeep';
import React, { forwardRef, useEffect, useState } from 'react';
import SortingComp from './SortingComp';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'


const CustomHeader = forwardRef((props, ref) => {

    const { visibleColumns } = props

    const [searchPatternArr, setSearchPatternArr] = useState(visibleColumns.map((col) => ({ value: '', col })));
    const [isActiveSort, setIsActiveSort] = useState([]);
    const [checked, setChecked] = useState(false);



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

    function isCheckBoxCol(col) {
        return col.type === 'checkboxSelection'
    }

    function hasFilterField(col) {
        if (col?.hasOwnProperty('hasFilter')) {
            return col.hasFilter
        } else if (col.type === "checkboxSelection") {
            return false;
        }

        return true
    }

    const onHeaderChecked = (e, col) => {
        setChecked(e.target.checked);
        col.onHeaderChecked(e);
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
                        {isCheckBoxCol(col) ?
                            <Box
                                className="MuiDataGrid-cellCheckbox"
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Checkbox
                                    checked={checked}
                                    onChange={(e) => onHeaderChecked(e, col)}
                                    color="primary"
                                    sx={{ marginRight: 1 }}
                                />
                            </Box>

                            :
                            <>
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
                                {hasFilterField(col) ?
                                    <TextField value={searchPatternArr[idx]?.value} size='small' sx={{ width: '100%' }} placeholder='search' onChange={(e) => {
                                        const _searchArr = cloneDeep(searchPatternArr);
                                        _searchArr[idx] = { value: e.target.value, col: col }
                                        setSearchPatternArr(_searchArr)
                                        col.filterGrid(_searchArr, idx)
                                    }}
                                    />

                                    : null}
                            </>

                        }


                    </Box>
                )
            })}
        </Box >
    )

})

CustomHeader.displayName = "CustomHeader";

export default CustomHeader;