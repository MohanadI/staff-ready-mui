import AutoComplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';


const AutoCompleteComp = (props) => {
    const { label, api, options: propOpt, renderOption, mode, ...rest } = props
    const [loadingOpt, setLoadingOpt] = useState(false);



    const [options, setOptions] = useState([]);


    useEffect(() => {

        if (!api) {
            setOptions(propOpt);
        }

    }, [propOpt])

    useEffect(() => {

        (async () => {
            if (mode === 'lookup') {
                const resp = await api?.();
                setOptions(resp?.data)
            }
        })()

    }, [])


    const onInputChange = async (e, value, reason) => {
        if (api && mode !== 'lookup') {
            if (!value) {
                setOptions([])
                return;
            }
            if (reason === 'reset')
                return;
            setLoadingOpt(true)
            const resp = await api(value);
            setOptions(resp?.data || []);
            setLoadingOpt(false)

        }
    }

    const AutoCompleteComp = (
        <AutoComplete
            autoComplete
            renderInput={(params) => <TextField {...params} label={label}
            />}
            onInputChange={onInputChange}
            renderOption={(props, option) => {
                let optionFormat = ""
                if (typeof renderOption === 'function') {
                    optionFormat = renderOption(props, option);
                }

                return optionFormat

            }}
            options={options}
            loading={loadingOpt}
            loadingText="loading..."

            {...rest}
        />
    )

    return (
        <>
            {props.formComp ?
                <Controller
                    control={props.control}
                    name={rest?.name}
                    render={({ field }) => {
                        const { onChange: formOnChange, value, ...restFormProps } = field
                        const originalOnChange = rest?.onChange || (() => { })


                        function _onChange(e, data) {
                            formOnChange(data);
                            originalOnChange(e, data)
                        }

                        return (React.cloneElement(AutoCompleteComp, {
                            ...restFormProps,
                            ...AutoCompleteComp.props,
                            onChange: (e, data) => _onChange(e, data)
                        }))

                    }}
                    rules={rest.validation}
                />
                :
                AutoCompleteComp
            }

        </>

    )
}


export default AutoCompleteComp;