import Box from "@mui/material/Box";
import DialogHeader from "../Modal/DialogHeader";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button';
import StepWizard from "../StepWizard/StepWizard";
import { BulkEditContext } from "../../../modules/DocumentControl/pages/Setup/Context";
import { useRef, useState } from "react";
import { bulkEditConfigs } from "./BulkEditConfigs";
import isEmpty from "lodash/isEmpty";
import BulkEditMappers from "./BulkEditMapper";
import withAPI from "../../../api/core";


const BulkEditModal = (props) => {
    const { isOpen, onClose, api } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [documentProperties, setDocumentProperties] = useState({})
    const [reviewers, setReviewers] = useState({});
    const [finalReviewers, setFinalReviewers] = useState({});
    const [approvers, setApprovers] = useState({});
    const [formRef, setFormRef] = useState();
    const [loader, setLoader] = useState(false);

    const contextVal = {
        values: {
            documents: props.documents,
            selectedRows,
            documentProperties,
            reviewers,
            finalReviewers,
            approvers,
            formRef,
            loader
        },
        methods: {
            setSelectedRows,
            setDocumentProperties,
            setApprovers,
            setFinalReviewers,
            setReviewers,
            setFormRef,
            setLoader
        }
    }

    async function onNextClicked(actions, stepNo) {
        if ([1, 2, 3, 4].includes(stepNo)) {
            formRef.submitForm?.((data) => {
                formRef.internalSubmit(data)
                actions.nextStep();
            })()

        } else {
            actions.nextStep()

        }
    }

    function isNextBtnDisabled(activeStep, stepLength) {
        return (
            selectedRows.length === 0 ||
            activeStep === stepLength - 1
        )
    }

    function isBackBtnDisabled(activeStep, stepLength) {
        return activeStep === 0;
    }

    function isFinalStep(activeStep, stepLength) {
        return activeStep === (stepLength - 1)
    }

    async function onFinish() {

        const payload = BulkEditMappers.compToApiMapper(contextVal.values)
        const resp = await api.common.bulkEdit(payload)
    }

    return (
        <BulkEditContext.Provider value={contextVal}>
            <Box>

                <Dialog
                    open={isOpen}
                    aria-labelledby={'Bulk Edit Dialog'}
                    maxWidth={'lg'}
                    fullWidth={true}
                >
                    <DialogHeader onClose={onClose}>
                        Bulk Edit Modal
                    </DialogHeader>

                    <DialogContent>
                        <StepWizard
                            configs={bulkEditConfigs}
                            stepActions={(stepNo, stepsLen, actions) => {
                                return (
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            onClick={() => actions.prevStep()}
                                            variant={'outlined'}
                                            disabled={isBackBtnDisabled(stepNo, stepsLen)}
                                        >
                                            Back
                                        </Button>
                                        {isFinalStep(stepNo, stepsLen) ?
                                            <Button
                                                variant="outlined"
                                                sx={{ ml: 0.5 }}
                                                onClick={onFinish}
                                            >
                                                Finish
                                            </Button>
                                            :
                                            <Button
                                                variant={'outlined'}
                                                sx={{ ml: 0.5 }}
                                                onClick={() => onNextClicked(actions, stepNo)}
                                                disabled={isNextBtnDisabled(stepNo, stepsLen)}
                                            >
                                                Next
                                            </Button>

                                        }

                                        <Button
                                            onClick={onClose}
                                            color="secondary"
                                            sx={{ marginLeft: 'auto' }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                )
                            }}
                        />
                    </DialogContent>
                </Dialog>

            </Box>
        </BulkEditContext.Provider>
    )

}

export default withAPI(BulkEditModal);