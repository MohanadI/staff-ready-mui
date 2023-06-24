import cloneDeep from 'lodash/cloneDeep';
import { isThirdPartyComponent } from '../../utils/GeneralUtils';
import { Controller } from 'react-hook-form';
import React from 'react';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Style from './Style';



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
        acc[curr.name || curr] = '';
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

export function processingFormField(fields, theme, formHookProps, initData) {
    const style = Style(theme);

    const { control, register } = formHookProps

    const _fields = fields.map(element => {
        let { validation = {}, name } = element;
        validation = formatValidationMessage(validation)

        if (initData[name]) {
            formHookProps.setValue(name, initData[name])
        }

        if (isThirdPartyComponent(element?.comp)) {
            return ((formState) => {
                const { errors } = formState
                const isError = !!errors[element.name]?.message;
                const name = element?.name

                return (
                    <>
                        <Box sx={isError ? style.formErrorBorder : {}}>
                            <Controller
                                control={control}
                                name={element?.name}
                                render={({ field }) => {
                                    const { onChange: formOnChange, ...rest } = field
                                    const originalOnChange = element?.comp?.props?.onChange || (() => { })

                                    function _onChange(e) {
                                        formOnChange(e);
                                        originalOnChange(e)
                                    }
                                    return React.cloneElement(element?.comp,
                                        { ...rest, onChange: _onChange, name, ...formHookProps, sx: { width: '100%' } }

                                    )
                                }}
                                rules={validation}
                            />
                        </Box>

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
            }

            )
        } else {
            return ((formState) => {
                const { errors } = formState

                const comp = element?.comp;
                const name = element?.name;

                return <>
                    {React.cloneElement(comp, { ...comp.props, register, formComp: true, validation, name, ...formHookProps })}

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
            }
            )
        }
    })

    return _fields;

}