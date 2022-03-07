const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();


router.post("/order",  async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const config = {
        method: 'post',
        url: 'https://staging.api.scalapay.com/v2/orders',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : req.body
      };
      axios(config)
        .then(snapshot => {
            console.log("Success")
            res.status(200).json(snapshot.data);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 400){
                res.status(400).json(err.response.data);
            }
            if(err.response.status === 401){
                res.status(401).json(err.response.data);
            }
        });
  });

module.exports = router ;