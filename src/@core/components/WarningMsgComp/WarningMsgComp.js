
import ReportProblemIcon from "@mui/icons-material/ReportProblem"
import Typography from '@mui/material/Typography'

const WarningMsgComp = (props) => {

    const { message } = props
    return (
        <Typography variant="body1" color="initial">
            <ReportProblemIcon sx={{
                color: (theme) => theme.palette.danger,
                position: 'relative',
                top: '3px',
                mr: 0.75
            }} />
            {message}
        </Typography>
    )
}

export default WarningMsgComp;