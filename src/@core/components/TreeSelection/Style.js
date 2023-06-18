import { styled } from "@mui/material";
import StyledTreeItem from "../CustomTree/StyledComponets/StyledTreeItem";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";

export const CustomStyledTreeItem = styled(StyledTreeItem)(({ theme }) => {
    return {

        [`.${treeItemClasses.content}`]: {
            width: '100%',
            paddingTop: '5px',
            paddingBottom: '5px'
        }

    }

})
