import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'

const SideMenu = (props) => {
    const { menuList } = props

    const [menuListObj, setMenuListObj] = useState([])

    useEffect(() => {
        const _menuList = processList(menuList)
        setMenuListObj(_menuList)
    }, [menuList])


    const processList = (menuList) => {
        return menuList.map((item, i) => {
            return {
                active: i === 0 ? true : false,
                ...item
            }
        })
    }

    function onMenuItemClicked(idx) {
        const _menuList = menuListObj.map((item, i) => {
            return {
                ...item,
                active: idx === i,
            }
        })

        setMenuListObj(_menuList);
    }

    function getItemBorderStyle(idx) {
        const firstIdx = 0;
        const lastIdx = menuListObj.length - 1;
        const border = `1px solid white`;
        const bordersStyle = {};
        if (idx === firstIdx) {
            bordersStyle.borderBottom = border;
        } else if (idx === lastIdx) {
            bordersStyle.borderTop = border;
        } else {
            bordersStyle.borderBottom = border;
            bordersStyle.borderTop = border;

        }
        return bordersStyle
    }


    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    <List>
                        {menuListObj.map((item, idx) => {
                            const bordersStyle = getItemBorderStyle(idx)
                            return (
                                <ListItem key={idx} sx={{
                                    backgroundColor: item.active ? (theme) => theme.palette.primary.main : 'gray',
                                    color: 'white',
                                    ...bordersStyle
                                }}>
                                    <ListItemButton onClick={() => onMenuItemClicked(idx)}>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}

                    </List>

                </Grid>
                <Grid item md={9} sx={{ marginTop: 2 }}>
                    {menuListObj.filter(item => item.active)[0]?.comp}

                </Grid>

            </Grid>


        </Box>
    )
}

export default SideMenu;