import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { calcColWidth, getDefaultValues, processingFormField } from './FormUtils';
import { useTheme } from '@mui/material/styles';
import Style from './Style';
import { isEqual } from 'lodash';


const Form = React.forwardRef((props, ref) => {

    const { colPerRow, fields, actions, defaultValues, mode = "onTouched", onChange, onChangeDep, onSubmit, initData, readOnly } = props;

    const [defaultVal] = useState(() => getDefaultValues(defaultValues, fields));
    const [colWidth, setColWidth] = useState(4);
    const [fieldsComp, setFieldsComp] = useState([])
    const { handleSubmit, reset, formState, watch, ...restFormProps } = useForm({ mode: mode, defaultValues: defaultVal });
    const theme = useTheme();
    const prevFormData = useRef(getDefaultValues(defaultValues, onChangeDep));


    useEffect(() => {

        const _fields = processingFormField(fields, theme, restFormProps, initData, readOnly);
        setFieldsComp(_fields);

    }, [props.fields, props.readOnly])


    useEffect(() => {

        const _colWidth = calcColWidth(colPerRow, fields.length);
        setColWidth(_colWidth)

    }, [colPerRow])

    useImperativeHandle(ref, () => (
        {
            submitForm: handleSubmit,
            internalSubmit: _onSubmit
        }
    ))




    let formData = "";

    if (typeof onChange === 'function') {
        if (onChangeDep && Array.isArray(onChangeDep)) {
            formData = watch(onChangeDep)
        } else {
            formData = watch();
        }

    }

    useEffect(() => {
        if (typeof onChange === 'function') {
            const _formData = Array.isArray(formData) ? formData.reduce((acc, curr, i) => {
                acc[onChangeDep[i]] = curr
                return acc;
            }, {}) : formData

            if (!isEqual(prevFormData.current, _formData)) {
                prevFormData.current = _formData;
                onChange(_formData);
            }
        }
    }, [formData])






    function _onSubmit(result) {
        if (typeof onSubmit === 'function') {
            onSubmit(result);
        }
    }


    let calledFields = [];
    if (props.hasOwnProperty('customLayout') && props.customLayout) {
        calledFields = fieldsComp.map(field => field.comp(formState))
    }

    const defaultLayout = (<Grid container spacing={2}>
        {fieldsComp?.filter(field => !field.hideInLayout)?.map((field, i) => {
            return (
                <Grid key={i} item md={colWidth}>

                    {field.comp(formState)}
                </Grid>
            )
        })}
    </Grid>)

    return (
        <Box sx={props.sx}>
            <form onSubmit={handleSubmit(_onSubmit)}>

                <Grid container spacing={2}>

                    <Grid item md={12}>
                        {props.hasOwnProperty('customLayout') && typeof props.customLayout === 'function' ?
                            props.customLayout(calledFields, defaultLayout, actions)
                            :
                            defaultLayout
                        }
                    </Grid>

                    {props.hasOwnProperty('customAction') && typeof props.customAction === 'function' ?
                        props.customLayout(calledFields) :
                        <Grid item md={12}>
                            <Stack direction={'row'} spacing={1}>
                                {actions?.map((action, idx) => {
                                    const actionProps = {};
                                    if (action.type === 'submit') {
                                        actionProps.type = 'submit'
                                    }

                                    if (action.type === 'reset') {
                                        actionProps.onClick = () => reset(defaultVal);
                                        actionProps.type = 'button';
                                    }

                                    return (
                                        <Item key={idx}>
                                            {React.cloneElement(action.comp, actionProps)}
                                        </Item>
                                    )
                                })}
                            </Stack>
                        </Grid>}
                </Grid>

            </form>
        </Box>

    )

})

export default Form;