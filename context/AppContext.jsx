import { createContext, useReducer } from 'react'


const initialState = {
    consumer:{
        email: null,
        givenNames: null,
        sername: null,
        phoneNumber: null
    },
    items: [
        {
            price:{
                amount:"100",
                currency:"EUR"
            },
            brand:"Apple",
            category:"Electronics",
            name:"iPhone X",
            quantity:1,
            sku:"APPLEIPHONEX"
        }
    ],
    shipping:{
        countryCode:null,
        line1:null,
        name:null,
        phoneNumber:null,
        postcode:null,
        suburb:null
    },
    merchant:{
        redirectCancelUrl:"http://localhost:3000/cancel",
        redirectConfirmUrl:"http://localhost:3000/confirm",
    },
    totalAmount:{
        amount:"100",
        currency:"EUR"
    }
}

export const AppContext = createContext({state:initialState, dispatch:()=>{}})

const appReducer = (state, action) => {
    switch(action.type){
        case "SET_USER":
            return {...state, consumer:action.payload}
        case "SET_SHIPPING":
            return {...state, shipping:action.payload}
    }
}

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
  )
}
