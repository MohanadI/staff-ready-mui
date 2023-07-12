import { Box, Button, InputLabel, Stack, TextField } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import HeaderIcons from './HeaderIcons'
import Form from '../../../../../../../../@core/components/Form/Form'
import TreeSelection from '../../../../../../../../@core/components/TreeSelection/TreeSelection'
import AutoCompleteComp from '../../../../../../../../@core/components/AutoCompleteComp/AutoCompleteComp'
import withAPI from '../../../../../../../../api/core'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Context from '../../../../Context'

const DocumentPropertiesBody = (props) => {

  const [disabled, setDisabled] = useState(true)
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { setupPageData } = useContext(Context);
  const [docPropsData, setDocPropsData] = useState({});
  const { api } = props;



  // when component mounted:
  useEffect(() => {
    (async function () {
      const docPk = setupPageData?.selectedNode?.value;
      const resp = await api.documentImprove.get(docPk);
      const data = documentPropMapper(resp.data)
      setDocPropsData(data)
    })()
  }, [])

  function documentPropMapper(data) {
    return {
      name: data.name,
      subject: data.subject,
      classification: {
        name: data.extendedId,
        improvePk: data.improvePk
      },
      documentOwner: data.documentOwner,
      recurAssessment: data.recurAssessment,
      description: data.description,
    }
  }

  const enableEditMode = () => {
    setIsReadOnly(false)
  }


  return (
    <Fragment>
      <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
        <HeaderIcons />
      </Box>
      <Form
        onSubmit={(formData) => {
          console.log(formData)
        }}
        colPerRow={3}
        readOnly={isReadOnly}
        initData={docPropsData}
        fields={[
          {
            comp: (
              <TextField
                label="Name"
                size='small'
                title='The name of the document'
                InputLabelProps={{ shrink: true }}
              />
            ),
            name: 'name',
            validation: { required: true }
          },
          {
            comp: (
              <TextField
                label='Document Type'
                size='small'
                title="The Document Type"
                InputLabelProps={{ shrink: true }}

              />
            ),
            name: 'documentType',
            readOnly: true
          },
          {
            comp: (
              <TextField
                label='Document Content'
                size='small'
                title="The Document link"
                InputLabelProps={{ shrink: true }}
              />
            ),
            name: 'documentContent',
            readOnly: true
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

              />
            ),
            name: 'subject',
            validation: { required: true }
          },
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
            validation: { required: true }
          },
          {
            comp: (
              <TreeSelection
                label={'Document Owner'}
                validation={{ required: true }}
                mode="menu"
                displayPortion="text"
              />
            ),
            name: 'documentOwner',
            validation: { required: true }
          },
          {
            name: 'recurAssessment',
            validation: { required: true },
            comp: (
              <AutoCompleteComp
                size={'small'}
                defaultValue={'1 Month Interval'}
                mode={'lookup'}
                api={api.common.frequencies}
                label={"Time Between Reviews"}
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
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}

              />
            )
          },
          {
            comp: (
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                title="The Document description"
                InputLabelProps={{ shrink: true }}
              />
            ),
            name: 'description',
            hideInLayout: true
          },
        ]}
        customLayout={(fields, defaultLayout, actions) => {
          return (
            <>
              <Box>
                {defaultLayout}
              </Box>
              <Box sx={{ mt: 2 }}>
                {fields[8]}
              </Box>
            </>
          )
        }}
        actions={[
          {
            comp: <Button
              type='submit'
              variant='outlined'
            >
              Submit
            </Button>,
            type: 'outlined'
          },
          {
            comp: <Button
              variant='outlined'
            >
              Cancel
            </Button>,
            type: 'reset'
          },
          {
            comp: <Button
              onClick={enableEditMode}
              variant='outlined'

            >
              Edit
            </Button>
          }
        ]}
      />
    </Fragment>
  )
}

export default withAPI(DocumentPropertiesBody)