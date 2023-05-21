import Box from "@mui/material/Box";
import Stepper from '@mui/material/Stepper'
import { cloneElement, useState } from "react";
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import { Button } from "@mui/material";


const StepWizard = (props) => {
    const { stepActions, configs } = props;
    const [activeStep, setActiveStep] = useState(0);
    const stepLength = configs?.length || 1;

    const utilities = { nextStep, prevStep }

    function nextStep() {
        setActiveStep(currStep => (currStep === stepLength - 1 ? currStep : currStep + 1))
    }

    function prevStep() {
        setActiveStep(currStep => (currStep - 1) < 0 ? 0 : currStep - 1)
    }

    return (
        <Box>
            <Stepper alternativeLabel activeStep={activeStep}>
                {configs?.map((step, idx) => {
                    return (
                        <Step key={idx}>
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <Box sx={{ mt: 2 }} className="Step-Content">
                {configs?.map((step, idx) => {

                    return (
                        idx === activeStep ? <div key={idx}>
                            {cloneElement(step.content, { activeStep, stepLength, utilities })}
                        </div> : null
                    )
                })}

            </Box>

            <Box sx={{ mt: 2 }}>
                {stepActions?.(activeStep, stepLength, utilities)}
            </Box>
        </Box>
    )
}


export default StepWizard;