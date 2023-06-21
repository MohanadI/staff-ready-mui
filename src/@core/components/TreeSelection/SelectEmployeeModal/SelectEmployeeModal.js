import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogHeader from '../../Modal/DialogHeader';
import SideMenu from '../../SideMenu/SideMenu';


const SelectEmployeeModal = (props) => {

    const { isOpen, onClose, menuList = [] } = props;




    return (
        <Dialog
            open={isOpen}
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogHeader onClose={onClose}>
                Add Employee
            </DialogHeader>
            <DialogContent>

                <SideMenu
                    menuList={menuList}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="default">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default SelectEmployeeModal;