import Form from "../../Form/Form";
import TreeSelection from "../../TreeSelection/TreeSelection";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import withAPI from "../../../../api/core";
import Button from '@mui/material/Button'
import AutoCompleteComp from "../../AutoCompleteComp/AutoCompleteComp";
import { useBulkEditContext } from "../../../../modules/DocumentControl/pages/Setup/Context";
import { useEffect, useRef } from "react";
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import Typography from '@mui/material/Typography'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { grey } from "@mui/material/colors";
import WarningMsgComp from "../../WarningMsgComp/WarningMsgComp";


const BulkEditDocumentProperties = (props) => {

    const { api } = props;

    const sharedData = useBulkEditContext();
    const { selectedRows, documentProperties } = sharedData.values;
    const { setDocumentProperties, setFormRef } = sharedData.methods;
    const _formRef = useRef('');


    useEffect(() => {
        setFormRef(_formRef.current);
    }, [])

    return (
        <Box>
            <Typography sx={{ mb: 2 }} variant="h5" color="initial">
                Document Properties
            </Typography>
            <Typography sx={{ fontStyle: "italic", mb: 2, color: grey[600] }} variant="subtitle1" color="initial">
                {`${selectedRows.length} row(s) selected `}
            </Typography>
            <Form
                onSubmit={(formData) => {
                    setDocumentProperties(formData)
                }}
                initData={documentProperties}
                ref={_formRef}
                colPerRow={3}
                fields={[
                    {
                        comp: (
                            <TreeSelection
                                label={'Classification'}
                                api={api.classification.get}
                                expandFirstNode={true}
                                selectionType="classification"
                                displayPortion="text"
                            />
                        ),
                        name: 'classification',
                        // validation: { required: true }
                    },
                    {
                        comp: (
                            <TreeSelection
                                label={'Subject'}
                                api={api.subject.get}
                                selectionType="subject"
                                expandFirstNode={true}
                                displayPortion="text"
                                customTopLevelData={{
                                    value: '0',
                                    text: 'Subject (top level)',
                                    type: null
                                }}
                                validation={{ required: true }}
                            />
                        ),
                        name: 'subject',
                        // validation: { required: true }
                    },
                    {
                        comp: (
                            <TreeSelection
                                label={'Document Owner'}
                                validation={{ required: true }}
                                mode="menu"
                                displayPortion="name"
                                selectionType="employee"
                            />
                        ),
                        name: 'documentOwner',
                        // validation: { required: true }


                    },
                    {
                        name: 'revisionSchedule',
                        // validation: { required: true },
                        comp: (
                            <AutoCompleteComp
                                size={'small'}
                                mode={'lookup'}
                                api={api.common.frequencies}
                                label={"Revision Schedule"}
                                renderOption={(props, option) => {
                                    return (
                                        <Box {...props}>
                                            {option}
                                        </Box>
                                    )
                                }}
                                isOptionEqualToValue={(option, value) => {
                                    return option === value
                                }}
                            />
                        )
                    },
                    {
                        name: 'access',
                        // validation: { required: true },
                        comp: (
                            <AutoCompleteComp
                                size={'small'}
                                options={['Private', 'Public']}
                                label={"Access"}
                                renderOption={(props, option) => {
                                    return (
                                        <Box {...props}>
                                            {option}
                                        </Box>
                                    )
                                }}
                                isOptionEqualToValue={(option, value) => {
                                    return option === value
                                }}
                            />
                        )
                    },
                    {
                        name: 'locationMode',
                        comp: (
                            <RadioButtonGroup
                                buttonList={[
                                    {
                                        label: 'Add locations to selected documents',
                                        value: 'add'
                                    },
                                    {
                                        label: 'Replace locations on selected documents Locations',
                                        value: 'replace'
                                    }
                                ]}
                                size={'small'}
                            />
                        ),
                        validation: { required: true },
                        hideInLayout: true
                    }
                ]}
                customLayout={(fields, defaultLayout) => {
                    return (<Box>
                        {defaultLayout}
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                Locations
                            </Box>
                            <Box>
                                <WarningMsgComp
                                    message={"IMPORTANT: Documents that use Location Review Teams or Site Approvers will be affected by editing locations."}
                                />
                            </Box>
                            <Box>
                                {fields[5]}
                            </Box>


                        </Box>

                    </Box>)
                }}

            />
        </Box>
    )

}

export default withAPI(BulkEditDocumentProperties);