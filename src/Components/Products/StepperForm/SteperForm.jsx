import React, { useState } from 'react';
import Product0Form from './Product0Form';
import Product1Form from './Product1Form';
import { BiSolidCube } from "react-icons/bi";
import {
  AiOutlineCheckCircle,
} from "react-icons/ai";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
// import StepButton from '@mui/material/StepButton';
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button, Box, Typography, styled, StepLabel } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: "#20615C !important",
//       borderTop: "none",
//       // 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: "#20615C !important",
//       borderTop: "none",
//       // 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     borderTop: "3px dashed #CDCDCD",
//     borderColor: "divider !important",
//     width: "90%",
//     margin: "auto",
//   },
// }));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  fontSize: "20px",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#0659c8",
    // border: "1px solid #1A1824",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2B817B",
    border: "1px solid #1A1824",
    fontWeight: "bolder !important",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <BiSolidCube />,
    2: <AccountBoxIcon />,
    3: <AiOutlineCheckCircle />,
    // 4: <AiOutlineCheckCircle />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Product Details', 'Supplier Details', 'Complete'];

export default function StepperForm({ Product, setProduct, HandleImg, addItem, gotoAllPro, SellPro, P_p_Qty, setP_p_Qty }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNextAdditem = () => {
    if (Object.values(Product).length > 10) {
      addItem()

      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
      toast.success("Product added")

    } else {
      toast.error("Please Fill All Fields..")
      console.log(Product)
      console.log(Object.values(Product).length)
    }
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}
      // connector={<ColorlibConnector />}
      // sx={{ border: "1px solid red" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mb: 1, }}>
              {activeStep + 1 === 1 && <Product0Form setProduct={setProduct} Product={Product} HandleImg={HandleImg} SellPro={SellPro} P_p_Qty={P_p_Qty} setP_p_Qty={setP_p_Qty} />}
              {activeStep + 1 === 2 && <Product1Form setProduct={setProduct} Product={Product} HandleImg={HandleImg} SellPro={SellPro} />}
            </Box>

            {activeStep + 1 <= 2 ? <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, textTransform: "capitalize" }}
                variant="contained"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={activeStep + 1 === 2 ? handleNextAdditem : handleNext} sx={{ mr: 1, textTransform: "capitalize" }} variant="contained">
                {activeStep + 1 === 2 ? "Save" : "Next"}
              </Button>
            </Box> :
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "center" }}>
                {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                <Button onClick={gotoAllPro} sx={{ mr: 1, textTransform: "capitalize" }} variant="contained">
                  Complete
                </Button>
              </Box>}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}


