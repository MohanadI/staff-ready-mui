import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Controller } from 'react-hook-form'
import React from 'react'


const RadioButtonGroup = (props) => {

    const { label, onChange, buttonList, defaultValue, isFormComp, name, validation, formHookProps, size, error, ...rest } = props;

    const RadioGroupCmp = (
        <RadioGroup aria-label="" defaultValue={defaultValue} onChange={onChange}>
            {buttonList.map((item, idx) => {
                return (
                    <FormControlLabel key={idx} value={item.value} label={item.label} control={<Radio size={size} />} />
                )
            })}

        </RadioGroup>
    )


    return (
        <FormControl component="fieldset" required={validation.required} error={error}>
            <FormLabel component="legend">{label}</FormLabel>
            {isFormComp ?
                <Controller
                    rules={validation}
                    name={name}
                    control={formHookProps.control}
                    render={({ field }) => {
                        const { onChange: formOnChange, ...restFormProps } = field
                        const originalOnChange = rest?.onChange || (() => { })


                        function _onChange(e, data) {
                            formOnChange(data);
                            originalOnChange(e, data)
                        }

                        return (React.cloneElement(RadioGroupCmp, {
                            ...restFormProps,
                            ...RadioGroupCmp.props,
                            onChange: (e, data) => _onChange(e, data)
                        }))
                    }}

                />

                :
                RadioGroupCmp

            }
        </FormControl>
    )

}

export default RadioButtonGroup