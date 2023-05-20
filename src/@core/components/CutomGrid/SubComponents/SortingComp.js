import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const activeColor = 'black';
const nonActiveColor = '#bdbdbd'

const SortingComp = ({ onSortingChanged, isActive }) => {

    const [sortingMode, setSortingMode] = useState('none');

    const [arrowUpColor, setArrowUpColor] = useState(activeColor)
    const [arrowDownColor, setArrowDownColor] = useState(activeColor)

    useEffect(() => {
        if (!isActive) {
            setSortingMode('none');
            setArrowUpColor(activeColor)
            setArrowDownColor(activeColor)
        }

    }, [isActive])


    function changeMode(mode) {
        switch (mode) {
            case 'none':
                setSortingMode('asc')
                setArrowUpColor(activeColor)
                setArrowDownColor(nonActiveColor)
                onSortingChanged('asc');
                break;
            case 'asc':
                setSortingMode('desc')
                setArrowUpColor(nonActiveColor)
                setArrowDownColor(activeColor)
                onSortingChanged('desc');

                break;
            case 'desc':
                setSortingMode('asc');
                setArrowUpColor(activeColor)
                setArrowDownColor(nonActiveColor)
                onSortingChanged('asc');
                break;
        }
    }

    const onClick = (e) => {

        changeMode(sortingMode)

    }

    // useEffect(() => {

    //     // if (typeof onSortingChanged === 'function') {
    //     //     onSortingChanged(sortingMode);
    //     // }
    // }, [sortingMode])

    return (

        <Box
            // sx={{ display: 'flex' }}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <Typography
                sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={onClick}
            >

                <KeyboardArrowUpIcon sx={{ color: arrowUpColor }} fontSize='small' />
                <KeyboardArrowDownIcon fontSize='small'
                    sx={{ position: 'relative', bottom: '9px', cursor: 'pointer', color: arrowDownColor }} />
            </Typography>

        </Box>
    )
}

export default SortingComp;
