import Box from "@mui/material/Box";
import DialogHeader from "../../../../../../../@core/components/Modal/DialogHeader";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button';
import StepWizard from "../../../../../../../@core/components/StepWizard/StepWizard";
import { BulkEditContext } from "../../../Context";
import { useState } from "react";
import { bulkEditConfigs } from "../BulkEditConfigs";
import isEmpty from "lodash/isEmpty";

const BulkEditModal = (props) => {
    const { isOpen, onClose } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    const contextVal = {
        values: {
            documents: props.documents,
            selectedRows
        },
        methods: {
            setSelectedRows,
        }
    }

    async function onNextClicked(actions, stepNo) {
        if (stepNo === 1) {
            const form = contextVal.docPropFormRef?.current;
            form.submitForm?.((data) => {
                actions.nextStep();
            })()

        } else {
            actions.nextStep()

        }
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
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant={'outlined'}
                                            sx={{ ml: 0.5 }}
                                            onClick={() => onNextClicked(actions, stepNo)}
                                        >
                                            Next
                                        </Button>
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

export default BulkEditModal;