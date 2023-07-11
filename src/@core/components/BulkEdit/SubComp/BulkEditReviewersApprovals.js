import Box from "@mui/material/Box";
import { useBulkEditContext } from "../../../../modules/DocumentControl/pages/Setup/Context"
import WarningMsgComp from "../../WarningMsgComp/WarningMsgComp";
import Typography from '@mui/material/Typography'
import { grey } from "@mui/material/colors";
import Form from "../../Form/Form";
import TreeSelection from "../../TreeSelection/TreeSelection";
import Button from '@mui/material/Button'
import RadioButtonGroup from "../../RadioButtonGroup/RadioButtonGroup";
import { useEffect, useRef, useState } from "react";
import CustomGrid from "../../CutomGrid/CustomGrid";
import withAPI from "../../../../api/core";

const BulkEditReviewersApprovals = (props) => {
    const sharedData = useBulkEditContext();
    const { selectedRows, reviewers, finalReviewers, approvers } = sharedData.values
    const { setReviewers, setFinalReviewers, setApprovers, setFormRef } = sharedData.methods

    const [persons, setPersons] = useState([]);
    const [gridLoader, setGridLoader] = useState(false);
    const _formRef = useRef('');

    const { warningMsg, radioBtn, fieldNames, api } = props;

    const modeField = fieldNames[0].value;
    const employeeField = fieldNames[1].value

    const setState = {
        "reviewers": setReviewers,
        "finalReviewers": setFinalReviewers,
        "approvers": setApprovers
    }

    const states = {
        reviewers,
        finalReviewers,
        approvers
    }


    useEffect(() => {
        setFormRef(_formRef.current);
    }, [])

    useEffect(() => {
        const data = getInitData();
        setPersons(data?.persons || []);
    }, [reviewers, approvers, finalReviewers])

    function employeeMapper(data) {
        let persons = Array.isArray(data) ? data : [data];
        return persons.map(person => {
            const email = person?.primaryEmail?.smtpAddress?.smtpAddressNm
            return {
                name: person?.name,
                email: email,
                personPk: person?.personPk
            }
        })

    }

    function addEmployee(person, type) {
        if (person) {
            const mappedPerson = employeeMapper(person);
            setState[type]((state) => {
                return {
                    ...state,
                    persons: Array.isArray(state.persons) ? state.persons.concat(mappedPerson) : mappedPerson
                }
            });
        }
    }


    async function onFormChanged(data) {
        const employees = data[employeeField];
        const type = props.type;
        addEmployee(employees, type)
        const mode = data[modeField];
        setState[type](state => {
            return { ...state, mode }

        })
    }

    function getInitData() {
        const type = props.type;
        return states[type]

    }

    return (
        <Box>
            <Typography sx={{ fontStyle: "italic", mb: 2, color: grey[600] }} variant="subtitle1" color="initial">
                {`${selectedRows.length} row(s) selected `}
            </Typography>
            {warningMsg ?
                <WarningMsgComp
                    message={warningMsg}
                /> : null
            }


            <Form
                colPerRow={1}
                sx={{ mt: 2 }}
                initData={{ mode: getInitData()?.mode }}
                ref={_formRef}
                onChange={onFormChanged}
                onChangeDep={[fieldNames?.[1]?.value, fieldNames?.[0].value]}
                fields={[
                    {
                        name: fieldNames?.[0]?.value,
                        comp: (
                            <RadioButtonGroup
                                label={"Mode"}
                                buttonList={[
                                    {
                                        value: radioBtn?.[0]?.value || 'val1',
                                        label: radioBtn?.[0]?.label || 'label1',
                                    },
                                    {
                                        value: radioBtn?.[1]?.value || 'val2',
                                        label: radioBtn?.[1]?.label || 'label2',
                                    }
                                ]}
                            />
                        ),
                        validation: {
                            required: true
                        }
                    },
                    {
                        name: fieldNames[1].value,
                        comp: (
                            <TreeSelection
                                mode={'menu'}
                                customLayout={({ openModal }) => (
                                    <Button variant="outlined" onClick={openModal}>
                                        {fieldNames[1].label}
                                    </Button>
                                )}
                                selectionType={"employee"}
                                enableSelectAll={true}
                                setExternalLoader={setGridLoader}
                            />
                        )
                    }
                ]}
            />

            <CustomGrid
                rows={persons}
                paginationWhenNeeded={true}
                getRowId={(row) => row.name + row.mail + Math.random()}
                loading={gridLoader}
                columns={[
                    {
                        field: "name",
                        headerName: "Name",
                        flex: 1,
                        hasFilter: false

                    },
                    {
                        field: "email",
                        headerName: "Email",
                        flex: 1,
                        hasFilter: false
                    }
                ]}
            />
        </Box>

    )
}

export default withAPI(BulkEditReviewersApprovals)