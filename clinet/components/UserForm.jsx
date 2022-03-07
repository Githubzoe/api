import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../context/AppContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const UserForm = ({ activeStep, setActiveStep, handleBack,  steps }) => {
    const { state, dispatch } = useContext(AppContext);
    const [user, setUser] = useState({
        givenNames: '',
        surname: '',
        email: '',
        phoneNumber: '',
    });

    const {givenNames, surname, email, phoneNumber} = state.consumer;

    useEffect(()=> {
        {givenNames && setUser({
            givenNames: givenNames,
            surname: surname,
            email: email,
            phoneNumber: phoneNumber,
        })}
    },[givenNames, surname, email, phoneNumber])

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: "SET_USER", payload: user});
        setActiveStep(activeStep + 1);
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom data-testid="title">
        User Infomation
      </Typography>
      <form onSubmit={handleSubmit} data-testid="form">
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="givenNames"
                name="givenNames"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={user.givenNames}
                onChange={handleChange}
                data-testid="givenNamesField"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="surname"
                name="surname"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={user.surname}
                onChange={handleChange}
                data-testid="surnameField"


            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                // required
                id="email"
                name="email"
                label="email"
                fullWidth
                autoComplete="email"
                variant="standard"
                value={user.email}
                onChange={handleChange}
                data-testid="emailField"

            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="phone"
                name="phoneNumber"
                label="Mobile Phone"
                fullWidth
                autoComplete="mobile phone"
                variant="standard"
                value={user.phoneNumber}
                onChange={handleChange}
                data-testid="phoneNumberField"

            />
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                    </Button>
                )}

                <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    data-testid="nextButton"
                >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
            </Box>
        </Grid>
      </form>
    </React.Fragment>
  );
}