import cloneDeep from 'lodash/cloneDeep';
import { isThirdPartyComponent } from '../../utils/GeneralUtils';
import { Controller } from 'react-hook-form';
import React from 'react';
import { Box, InputLabel } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Style from './Style';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'






export function formatValidationMessage(validation) {
    const _validation = cloneDeep(validation)
    const required = _validation.required;
    const maxLength = _validation.maxLength;
    if (required && typeof required === 'boolean') {
        _validation.required = 'This field should not be Empty';
    }

    if (_validation.hasOwnProperty('maxLength') && typeof maxLength !== 'object') {
        _validation.maxLength = {
            value: maxLength,
            message: `Max Length allowed is only ${maxLength} character(s)`
        }
    }

    return _validation
}

export function getDefaultValues(defaultValues, fields) {
    if (defaultValues) {
        return defaultValues
    }
    return fields?.reduce((acc, curr) => {
        acc[curr.name || curr] = null;
        return acc;

    }, {})
}

export function calcColWidth(colPerRow, fieldsCount) {
    let _colWidth = 0;
    if (colPerRow) {
        _colWidth = Math.ceil(12 / colPerRow)
    } else {
        _colWidth = Math.ceil(12 / fieldsCount)
    }

    return _colWidth;
}

export function processingFormField(fields, theme, formHookProps, initData, readOnly) {
    const style = Style(theme);

    const { control, register } = formHookProps

    const _fields = fields.map(element => {
        let { validation = {}, name } = element;
        validation = formatValidationMessage(validation)

        if (initData?.[name]) {
            formHookProps.setValue(name, initData[name])
        } else {
            formHookProps.setValue(name, null)

        }

        if (element?.comp?.readOnly || readOnly) {
            const { label, displayPortion = "text" } = element?.comp?.props;

            return {
                ...element,
                comp: () => {
                    return (
                        <FormControl>
                            <FormLabel>{label}</FormLabel>
                            <Box>
                                {typeof initData?.[name] === 'object' ? initData?.[name][displayPortion] : initData?.[name]}
                            </Box>
                        </FormControl>
                    )

                }
            }
        }

        if (isThirdPartyComponent(element?.comp)) {
            return {
                ...element,
                comp: ((formState) => {
                    const { errors } = formState
                    const name = element?.name
                    const isError = !!errors[element.name]?.message;

                    return (
                        <>
                            <Controller
                                control={control}
                                name={element?.name}
                                render={({ field }) => {
                                    const { onChange: formOnChange, ...restFormFieldsProps } = field
                                    const originalOnChange = element?.comp?.props?.onChange || (() => { })
                                    const { label } = element?.comp.props;

                                    function _onChange(e) {
                                        formOnChange(e);
                                        originalOnChange(e)
                                    }



                                    const _label = label ? <FormControl error={isError} required={!!validation.required}>
                                        <FormLabel> {label}</FormLabel>
                                    </FormControl> : null

                                    return (
                                        React.cloneElement(element?.comp,
                                            { ...restFormFieldsProps, ...element?.comp.props, onChange: _onChange, label: _label, name, error: isError, ...formHookProps, sx: { width: '100%' } })

                                    )
                                }}
                                rules={validation}
                            />

                            <Box sx={style.formErrorMsg || {}}>
                                {errors[element.name]?.message ?
                                    <>
                                        <ErrorOutlineIcon sx={style.formErrorIcon} />
                                        {errors[element.name]?.message}
                                    </>
                                    : null
                                }
                            </Box>
                        </>
                    )
                })
            }
        } else {
            return {
                ...element,
                comp: ((formState) => {
                    const { errors } = formState
                    const isError = !!errors[element.name]?.message;
                    const comp = element?.comp;
                    const name = element?.name;

                    return <>
                        {React.cloneElement(comp, { ...comp.props, error: isError, isFormComp: true, validation, name, formHookProps })}

                        <Box sx={style.formErrorMsg || {}}>
                            {errors[element.name]?.message ?
                                <>
                                    <ErrorOutlineIcon sx={style.formErrorIcon} />
                                    {errors[element.name]?.message}
                                </>
                                : null
                            }
                        </Box>
                    </>
                }),

            }
        }
    })

    return _fields;

}