import { useBulkEditContext } from "../../../../modules/DocumentControl/pages/Setup/Context"
import Box from "@mui/material/Box"
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { grey } from "@mui/material/colors"
import Grid from '@mui/material/Grid'
import withAPI from "../../../../api/core"



const BulkEditSummary = () => {
    const sharedData = useBulkEditContext();

    const { documentProperties, reviewers, finalReviewers, approvers } = sharedData.values;

    return (
        <Box>
            <Typography sx={{ fontStyle: "italic", mb: 2, color: grey[600] }} variant="subtitle1" color="initial">
                {`The following changes will be applied to the selected documents:`}
            </Typography>

            <Grid container spacing={2}>
                <Grid item md={4}>

                    <FormControl>
                        <FormLabel>Update Classification</FormLabel>
                        <Box>
                            {documentProperties?.classification?.text || 'N/A'}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>

                    <FormControl>
                        <FormLabel>Update Subject</FormLabel>
                        {documentProperties?.subject?.text || 'N/A'}
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl>
                        <FormLabel>Update Owner</FormLabel>
                        <Box>
                            {documentProperties?.documentOwner?.name || 'N/A'}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>

                    <FormControl>
                        <FormLabel>Update Revision Schedule</FormLabel>
                        <Box>
                            {documentProperties?.revisionSchedule || 'N/A'}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>

                    <FormControl>
                        <FormLabel>Update Access</FormLabel>
                        <Box>
                            {documentProperties?.access || 'N/A'}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl>
                        <FormLabel>{`${documentProperties?.locationMode?.toUpperCase()} Locations`}</FormLabel>
                        {documentProperties?.locations?.map((location) => {
                            return (
                                <Box>
                                    {location.label}
                                </Box>
                            )
                        })}

                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl>
                        <FormLabel>{`${reviewers?.mode?.toUpperCase()} Reviewers`}</FormLabel>
                        <Box>
                            {reviewers?.persons?.map((person, idx) => {
                                return (
                                    <Box key={idx}>
                                        {person?.name}
                                    </Box>

                                )
                            })}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl>
                        <FormLabel>{`${finalReviewers?.mode?.toUpperCase()} final Reviewers`}</FormLabel>
                        <Box>
                            {finalReviewers?.persons?.map((person, idx) => {
                                return (
                                    <Box key={idx}>
                                        {person?.name}
                                    </Box>

                                )
                            })}
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item md={4}>
                    <FormControl>
                        <FormLabel sx={{ ml: 0 }}>{`${approvers?.mode?.toUpperCase()} Approvers`}</FormLabel>
                        <Box>
                            {approvers?.persons?.map((person, idx) => {
                                return (
                                    <Box key={idx}>
                                        {person?.name}
                                    </Box>

                                )
                            })}
                        </Box>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>

    )

}

export default BulkEditSummary;