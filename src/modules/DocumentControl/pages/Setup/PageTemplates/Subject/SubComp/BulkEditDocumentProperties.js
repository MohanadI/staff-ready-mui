import Form from "../../../../../../../@core/components/Form/Form";
import TreeSelection from "../../../../../../../@core/components/TreeSelection/TreeSelection";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import withAPI from "../../../../../../../api/core";
import Button from '@mui/material/Button'
import AutoCompleteComp from "../../../../../../../@core/components/AutoCompleteComp/AutoCompleteComp";
import { useBulkEditContext } from "../../../Context";
import { useEffect, useRef } from "react";

const BulkEditDocumentProperties = (props) => {

    const { api } = props;

    const context = useBulkEditContext();

    const formRef = useRef('');

    useEffect(() => {
        context.docPropFormRef = formRef;
    }, [])

    return (
        <Box>
            <Form
                onSubmit={(formData) => {
                    console.log(formData)
                }}
                ref={formRef}
                colPerRow={3}
                fields={[
                    {
                        comp: (
                            <TreeSelection
                                label={'Classification'}
                                api={api.classification.get}
                                expandFirstNode={true}
                                selectionType="classification"
                            />
                        ),
                        name: 'classification',
                        validation: { required: true }
                    },
                    {
                        comp: (
                            <TreeSelection
                                label={'Subject'}
                                api={api.subject.get}
                                selectionType="subject"
                                expandFirstNode={true}
                                customTopLevelData={{
                                    value: '0',
                                    text: 'Subject (top level)',
                                    type: null
                                }}
                                validation={{ required: true }}
                            />
                        ),
                        name: 'subject',
                        validation: { required: true }
                    },
                    {
                        comp: (
                            <TreeSelection
                                label={'Document Owner'}
                                validation={{ required: true }}
                                mode="menu"
                            />
                        ),
                        name: 'documentOwner',
                        validation: { required: true }


                    },
                    {
                        name: 'revisionSchedule',
                        validation: { required: true },
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
                        validation: { required: true },
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
                    }
                ]}

            // actions={[{
            //     comp: <Button type="submit" variant="outlined">
            //         submit
            //     </Button>,
            //     type: 'submit'
            // }]}
            />

        </Box>
    )

}

export default withAPI(BulkEditDocumentProperties);