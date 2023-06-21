import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import AutoCompleteComp from '../../../AutoCompleteComp/AutoCompleteComp'
import withAPI from '../../../../../api/core'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

const EmployeeNameForm = (props) => {
    const { api, onSelection } = props;

    const [selectedData, setSelectedData] = useState('');
    const [dataLoader, setDataLoader] = useState(false);
    const [displayData, setDisplayData] = useState('');

    const apiDataMapper = (data) => {
        return {
            "Full Name": data?.name,
            "Employee Id": data?.worker?.id,
            "Login Id": data?.user?.UserId,
            "Department": data.worker?.department?.name || data.worker?.department?.id,
            "Job Title": data.worker?.jobTitle?.name || data.worker?.jobTitle?.id,
            "Hire Date": data.worker?.hireDateString
        }
    }

    const onSelect = async (e, opt, reason) => {
        if (reason === 'selectOption') {
            setDataLoader(true);
            const resp = await api.common.workerAccount(opt.value)
            setDataLoader(false);
            const mappedData = apiDataMapper(resp?.data)
            setSelectedData(resp?.data);
            setDisplayData(mappedData)
        } else {
            setSelectedData('');
        }
    }

    return (
        <>
            <Box>
                <AutoCompleteComp
                    label={"Name"}
                    options={['tedt', 'tets2']}
                    api={api.common.getWorkers}
                    renderOption={(props, option) => {
                        return <Box {...props}>
                            {option.label}
                        </Box>
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option.value === value.value
                    }}
                    onChange={onSelect}
                    size={"small"}
                />
            </Box>

            {dataLoader ?
                <Box sx={{ height: "70%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />


                </Box>
                : null}

            {displayData && !dataLoader ?
                <>
                    <Box sx={{ m: 2 }}>
                        <Grid container spacing={2}>
                            {Object.keys(displayData).map((key, idx) => {
                                return (
                                    <Grid item md={6}>
                                        <FormControl>
                                            <FormLabel>{key}</FormLabel>
                                            <Box>{displayData[key] || 'not set'}</Box>
                                        </FormControl>
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={() => onSelection({ text: selectedData.name, value: selectedData.personPk })}>
                            Add to Owner
                        </Button>
                    </Box>
                </>
                : null}

        </>

    )
}

export default withAPI(EmployeeNameForm);
