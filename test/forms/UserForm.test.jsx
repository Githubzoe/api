import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import { UserForm} from '../../components/UserForm';

afterEach(cleanup);

describe("Render UserForm component", ()=>{
    test("should render component title", () => {
        const {getByText} = render(<UserForm steps={0} />);
        const title = getByText("User Infomation");
        expect(title).toBeInTheDocument();
    })
})

describe("Testing Button", ()=>{
    test("Next Button should be clicked", () => {
        const handleSubmit = jest.fn();
        render(<UserForm steps={0} handleSubmit={handleSubmit}  />);
        const nextButton = screen.getByTestId("nextButton");
        fireEvent.click(nextButton);

        expect(handleSubmit).toHaveBeenCalled();
    })
})