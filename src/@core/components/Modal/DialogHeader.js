import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


const DialogHeader = (props) => {

    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ mb: 2, p: 2, border: (theme) => `1px solid ${theme.palette.grey[300]}` }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export default DialogHeader;