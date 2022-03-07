import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useRouter } from 'next/router'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer qhtfs87hjnc12kkos',
    }
}

export const Confirm = ({ activeStep, setActiveStep, handleBack,  steps })  => {
    const { state } = useContext(AppContext);
    const { items, shipping, consumer, totalAmount } = state;
    const router = useRouter();
    const [error, setError] = useState(null);    

    const sendOrder = (data) => {
        axios.post('http://localhost:5000/api/order', data, config)
            .then(res => {
                setActiveStep(activeStep + 1);
                router.push(res.data.checkoutUrl);
            }).catch((err) => {
                if(err.response.status === 400){
                    setError("Please check your details and try again.");
                    console.log(err)
                    console.error(err)
                }
                if(err.response.status === 401){
                    console.log(err)
                    console.error(err)
                    setError("Authentication failed. Please login again or Contact us.");
                }
            })
    }

    const handleClick = async () => {
        sendOrder(state);
    }

  return (
    <React.Fragment>
        {error && <Typography variant="h6" className="error_message" data-testid="error" >{error}</Typography>}
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
          <Typography gutterBottom>{consumer.givenNames} {consumer.sername}</Typography>
          <Typography gutterBottom>{consumer.email}</Typography>
          {consumer.phoneNumber && <Typography gutterBottom>{consumer.phoneNumber}</Typography>}

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
}