import { Box, Button, Stack, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import HeaderIcons from './HeaderIcons'
import Form from '../../../../../../../../@core/components/Form/Form'
import TreeSelection from '../../../../../../../../@core/components/TreeSelection/TreeSelection'
import AutoCompleteComp from '../../../../../../../../@core/components/AutoCompleteComp/AutoCompleteComp'
import withAPI from '../../../../../../../../api/core'

const DocumentPropertiesBody = (props) => {

  const [disabled, setDisabled] = useState(true)

  // when component mounted:
  useEffect(() => {
    console.log("Component Mounted")
  }, [])

  const disabledClick = () => {
    setDisabled(!disabled)
  }

  const { api } = props;

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
        // ref={formRef}
        fields={[
            {
              comp: (
                <TextField 
                  label='Name' 
                  color='success'
                  size='small'
                  defaultValue="Document name"
                  title='The name of the document'
                  helperText='The name of the document'
                  // defaultValue="Building Security Assessment"
                  disabled={disabled}
                  required 
                />
              ),
              name: 'name',
              validation: { required: true }
            },
            {
              comp: (
                <TextField 
                label='Document Type' 
                color='success' 
                size='small'
                defaultValue='File or URL'
                title="The Document Type"
                helperText="The Document Type" 
                required
                disabled
              />
              ),
              name: 'documentType',
            },
            {
              comp: (
                <TextField 
                label='Document Content' 
                defaultValue='[not set]' 
                color='success' 
                size='small'
                title="The Document link"
                helperText="The Document link"
                required
                disabled
                />
                ),
                name: 'documentContent',
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
              name: 'time',
              validation: { required: true },
              comp: (
                <AutoCompleteComp
                    size={'small'}
                    defaultValue ={'1 Month Interval'}
                    mode={'lookup'}
                    api = {api.common.frequencies}
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
                    defaultValue={'Private'}
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
              comp: (
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  // defaultValue="Building Security Assessment"
                  defaultValue="Document description"
                  title="The Document description"
                  helperText="The Document description"
                  disabled={disabled}
                />
              ),
              name: 'test5',
            },
      ]}
      actions={[
        {
          comp: <Button
          type='submit'
          variant='contained'
          >
            Submit
          </Button>,
          type: 'submit'
        },
        {
          comp: <Button
          variant='contained'
          >
            Cancel
          </Button>,
          type: 'reset'
        },
        {
          comp: <Button 
          onClick={disabledClick}
          variant='contained'
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