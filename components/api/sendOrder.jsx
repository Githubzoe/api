import React from 'react'
import { useRouter } from 'next/router'

export const SendOrder = () => {
    const router = useRouter();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer qhtfs87hjnc12kkos',
        }
    }

    axios.post('http://localhost:5000/api/order', data, config)
            .then(res => {
                return res.data
            }).catch((err) => {
                if(err.response.status === 400){
                    return "Please check your details and try again.";
                }
                if(err.response.status === 401){
                    return "Authentication failed. Please login again or Contact us.";
                }
            })
}
