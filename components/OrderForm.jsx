import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddressForm } from './AddressForm';
import { UserForm } from './UserForm';
import { Confirm } from './Confirm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

const steps = ['User Information', 'Shipping address', "Confirm Order"];

const theme = createTheme();

export default function OrderForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { state, dispatch } = useContext(AppContext);


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const getStepContent = (step) => {
    switch (step) {
        case 0:
          return <UserForm  activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack}  steps={steps} />;
        case 1:
          return <AddressForm activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack}  steps={steps} />;
        case 2:
            return <Confirm activeStep={activeStep} setActiveStep={setActiveStep} handleBack={handleBack}  steps={steps} />;
        default:
          throw new Error('Unknown step');
      }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            My Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
                {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                    Your order is processing...
                    </Typography>
                    <Typography variant="subtitle1">
                    We will jump to the next step in a few seconds.
                    </Typography>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    {getStepContent(activeStep)}
                </React.Fragment>
                )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}