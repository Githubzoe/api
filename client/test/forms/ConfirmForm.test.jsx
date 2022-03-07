/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import { render, screen, cleanup } from "../test-utils";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitForElement,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Confirm } from '../../components/Confirm';
import {
  axiosErrorResponse400,
  axiosErrorResponse401,
} from '../mocks/mockData.js';

afterEach(cleanup);

test('Component should be rendered', async () => {
  render(<Confirm steps={2} />);
  const orderButton = screen.getByTestId('confirm-order');
  expect(orderButton).toBeInTheDocument('PLACE ORDER');
});

test('Component should be rendered', async () => {
  render(<Confirm steps={2} />);
  const text = screen.getByText('Order summary');
  expect(text).toBeInTheDocument();
});

// test('The Confirm Order button has been clicked', async() => {
//     const handleClick = jest.fn();
//     render(<Confirm steps={2} handleClick={handleClick} />);
//     const orderButton = screen.getByTestId("confirm-order");
//     fireEvent.click(orderButton);

//     expect(handleClick).toHaveBeenCalled();
// })

describe('Send API request', () => {
  // describe("When API call is successful", () => {
  //     const AxiosResponse = {
  //         data:{
  //             "token": "01L0FW6CT5",
  //             "expires": "2022-03-06T23:39:42.905Z",
  //             "checkoutUrl": "https://portal.staging.scalapay.com/checkout/01L0FW6CT5"
  //         }
  //     }
  //     jest.spyOn(axios, "post").mockResolvedValue(AxiosResponse);
  //     render(<Confirm steps={2} />);
  //     expect(axiosMock.post).toHaveBeenCalledTimes(1);

  // })

    test('Input Values are not valid', async () => {
        await jest.spyOn(axios, 'post').mockRejectedValue(axiosErrorResponse400);
        render(<Confirm steps={2} />);
        const error = screen.getByText('Please check you details and try again.')
        waitFor(()=> expect(error).toBeInTheDocument())
    });

    test('Authorization fail', async () => {
      await jest.spyOn(axios, 'post').mockRejectedValue(axiosErrorResponse401);
      render(<Confirm steps={2} />);
    //   const error = screen.getByText('Please check you details and try again.');
        const error = screen.getByTestId("error")
      waitFor(() => expect(error).toBeInTheDocument());
    });
});
