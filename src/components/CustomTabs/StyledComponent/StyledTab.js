import styled from "@emotion/styled";
import { tabClasses } from "@mui/material";
import Button, { buttonClasses } from '@mui/material/Button'


const StyledTab = styled(Button)(({ theme, active, tabIdx, tabsCount }) => {
    const tabBorder = {
    };

    if (tabIdx == tabsCount - 1) {
        tabBorder.borderLeft = 'none';
    }

    if (tabIdx === 0) {
        tabBorder.borderRight = 'none'
    }

    return {
        [`&.${buttonClasses.root}`]: {
            flexGrow: active === 'true' ? 2 : 1,
            borderRadius: '0',
            ...tabBorder,
            ".tab-text": {
                fontSize: '12px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textTransform: 'none',
            }
        },
        [`.${buttonClasses.startIcon}`]: {
            marginRight: active === 'true' ? 2 : 0
        }
    }
})

export default StyledTab