import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';                       
import axios from 'axios';
import SellerDetail from '../seller/SellerDetail';
import BuyerDetail from '../buyer/BuyerDetail';
import { appInsights } from "../appSerivceInsight/appServiceInsight";
require('dotenv').config();
let getBuyerBalanceInBankAPI;
let getSellerBalanceinBankAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getBuyerBalanceInBankAPI = process.env.REACT_APP_BANK_API_HOSTNAME + ':' + process.env.REACT_APP_BANK_API_PORT + '/bank/buyerBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
  getSellerBalanceinBankAPI = process.env.REACT_APP_BANK_API_HOSTNAME + ':' + process.env.REACT_APP_BANK_API_PORT + '/bank/sellerBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;  
} else {
  getBuyerBalanceInBankAPI = process.env.REACT_APP_BANK_API_HOSTNAME + ':' + process.env.REACT_APP_BANK_API_PORT + '/buyerBalance';
  getSellerBalanceinBankAPI = process.env.REACT_APP_BANK_API_HOSTNAME + ':' + process.env.REACT_APP_BANK_API_PORT + '/sellerBalance';  
}

export default function Bank() {
  const [buyer, setBuyer] = useState([]);
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(getBuyerBalanceInBankAPI),
      axios.get(getSellerBalanceinBankAPI)
    ])  
    .then((res) => {
      console.log('buyer data:', res[0].data);
      setBuyer(res[0].data);
      console.log('seller data:', res[1].data);
      setSeller(res[1].data);
      appInsights.trackEvent({
        name: 'bank data'
      });
    })
    .catch(console.log);
  }, []);

    return (
      <div>
      <Card border="primary" className="text-center">
        <Card.Header as="h3">Buyer</Card.Header>
        <Card.Body> 
          <Card.Title>Total Balance</Card.Title>
          <Card.Text>
             <BuyerDetail buyer={buyer} />
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
      <Card border="secondary" className="text-center">
        <Card.Header as="h3">Seller</Card.Header>
        <Card.Body>
          <Card.Title>Total Balance</Card.Title>
          <Card.Text>
            <SellerDetail seller={seller} />
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    )
}