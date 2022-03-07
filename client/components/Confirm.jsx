/** @format */

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useRouter } from 'next/router';
import { SendOrder } from './api/sendOrder';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const Confirm = ({ activeStep, setActiveStep, handleBack, steps }) => {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { items, shipping, consumer, totalAmount } = state;
  const [error, setError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleClick = async () => {
    await SendOrder(state, activeStep, setActiveStep, setError, setRedirectUrl);
    if (!error) {
      console.log(redirectUrl);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <Typography variant="h6" className="error_message" data-testid="error">
          {error}
        </Typography>
      )}
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.name} />
            <Typography variant="body2">{item.price.amount}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalAmount.amount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            User Info
          </Typography>
          <Typography gutterBottom>
            {consumer.givenNames} {consumer.sername}
          </Typography>
          <Typography gutterBottom>{consumer.email}</Typography>
          {consumer.phoneNumber && (
            <Typography gutterBottom>{consumer.phoneNumber}</Typography>
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Detail
          </Typography>
          <Typography gutterBottom>{shipping.line1}</Typography>
          <Typography gutterBottom>{shipping.suburb}</Typography>
          <Typography gutterBottom>{shipping.postcode}</Typography>
          <Typography gutterBottom>{shipping.name}</Typography>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ mt: 3, ml: 1 }}
            data-testid="confirm-order"
          >
            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
          </Button>
        </Box>
      </Grid>
    </React.Fragment>
  );
};
