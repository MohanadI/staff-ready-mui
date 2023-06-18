import Form from "../../../../../../../@core/components/Form/Form";
import TreeSelection from "../../../../../../../@core/components/TreeSelection/TreeSelection";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import withAPI from "../../../../../../../api/core";
import Button from '@mui/material/Button'

const BulkEditDocumentProperties = (props) => {

    const { api } = props;

    return (
        <Box>
            <Form
                onSubmit={(formData) => {
                    console.log(formData)
                }}
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
                    }
                ]}

                actions={[{
                    comp: <Button type="submit" variant="outlined">
                        submit
                    </Button>,
                    type: 'submit'
                }]}
            />

        </Box>
    )

}

export default withAPI(BulkEditDocumentProperties);