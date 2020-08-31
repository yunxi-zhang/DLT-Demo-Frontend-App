import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import SellerDetail from './SellerDetail';
require('dotenv').config();
let getSellerBalanceAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getSellerBalanceAPI = process.env.REACT_APP_SELLER_API_HOSTNAME + ':' + process.env.REACT_APP_SELLER_API_PORT + '/seller/balance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
} else {
  getSellerBalanceAPI = process.env.REACT_APP_SELLER_API_HOSTNAME + ':' + process.env.REACT_APP_SELLER_API_PORT + '/balance';
}

export default function Seller() {
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(getSellerBalanceAPI),
    ])  
    .then((res) => {
      console.log('seller data:', res[0].data);
      setSeller(res[0].data)
    })
    .catch(console.log);
  }, []);

  return (
    <div>
      <Card border="secondary" className="text-center">
        <Card.Header as="h3">Seller</Card.Header>
        <Card.Body>
          <Card.Title>Total Balance</Card.Title>
          <Card.Text>
            <SellerDetail seller={seller} />
          </Card.Text>
          <Button variant="primary">Change Balance</Button>
        </Card.Body>
      </Card>
    </div>
  );
}