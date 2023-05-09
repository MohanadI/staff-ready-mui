import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import AccordionComponent from "../../../../@core/components/Accordion";

const SetupPageTypes = {
    "subject": [
        {
            key: "subject",
            title: "Subject",
        },
        {
            key: "subject_document",
            title: "Subject Document"
        }
    ]
};

function SetupPage() {
    const [expanded, setExpanded] = React.useState(false);
    const [selectedSubject, setSelectedSubject] = React.useState(
        SetupPageTypes.subject
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    <Typography variant="h5" gutterBottom>
                        Subject Name
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {selectedSubject.map((item) => (
                        <AccordionComponent
                            item={item}
                            expanded={expanded}
                            setExpanded={(data) => setExpanded(data)}
                        />
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default SetupPage;
