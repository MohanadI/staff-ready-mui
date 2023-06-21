import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DialogHeader from "../Modal/DialogHeader";
import CustomTree from "../CustomTree/CustomTree";
import withAPI from "../../../api/core";
import { useEffect, useState } from "react";
import { CustomStyledTreeItem } from "./Style";



const TreeSelectionModal = (props) => {
    const { isOpen, onClose, headerTitle, api, expandFirstNode, selectionType, customTopLevelData, onSelection } = props;

    const [treeData, setTreeData] = useState([])
    const [defaultExpandNode, setDefaultExpandNode] = useState('');

    useEffect(() => {
        (async () => {
            const resp = await api?.() || {};
            let data = resp.data;
            if (customTopLevelData) {
                data = [{ ...customTopLevelData, children: resp.data }]
            }
            setTreeData(data)
        })()
    }, [])

    useEffect(() => {
        if (expandFirstNode) {
            setDefaultExpandNode([treeData[0]?.value])
        }
    }, [treeData])

    const onSelectedData = (e, node) => {
        e.stopPropagation()
        if (typeof onSelection === 'function') {
            onSelection(node);
        }
    }

    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={'sm'}
            fullWidth={true}
        >
            <DialogHeader onClose={onClose}>{`Select ${headerTitle}`}</DialogHeader>
            <DialogContent>
                <CustomTree
                    data={treeData}
                    defaultExpandIds={defaultExpandNode}
                    nodeFormatter={(node) => {
                        return (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={node.type === selectionType ? { pt: 0.75 } : {}}>
                                    {node.text}

                                </Box>
                                {node.type === selectionType ?
                                    <Button size={'small'} variant="outlined" onClick={(e) => onSelectedData(e, node)}>
                                        Select
                                    </Button>
                                    : null}

                            </Box>
                        )
                    }}
                    styledTreeItem={() => <CustomStyledTreeItem />}

                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="secondary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    )
}

TreeSelectionModal.displayName = 'TreeSelectionModal';

export default TreeSelectionModal;