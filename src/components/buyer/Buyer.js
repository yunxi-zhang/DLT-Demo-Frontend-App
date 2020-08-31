import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import BuyerDetail from './BuyerDetail';
import LoadingBar from "../loading/Loading";
require('dotenv').config();
let getBuyerBalanceAPI;
let updateBuyerBalanceAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT +'/buyer/balance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
  updateBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/buyer/updateBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;  
} else {
  getBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT +'/balance';
  updateBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/updateBalance';
}

const Buyer = () => {
  const [buyer, setBuyer] = useState([]);
  const [newBuyerBalance, setNewBuyerBalance] = useState(0);
  const [caller, setCaller] = useState(false);

  useEffect(() => {
    axios.all([
      axios.get(getBuyerBalanceAPI),
    ])
      .then((res) => {
        setBuyer(res[0].data)
      })
      .catch(console.log);
  }, []);

  const getNewBalance = (e) => {
    setNewBuyerBalance(e.target.value);
  }

  const updateBalance = () => {
    setCaller(true);
    axios.post(updateBuyerBalanceAPI, {
      "key": "buyerBalance",
      "value": newBuyerBalance
    })
      .then((res) => {
        // call the get api again to get the latest value
        axios.all([
          axios.get(getBuyerBalanceAPI),
        ])
          .then((res) => {
            setCaller(false);
            setBuyer(res[0].data)
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  return (
    <div>
      <Card border="primary" className="text-center">
        <Card.Header as="h3">Buyer</Card.Header>
        <Card.Body>
          {caller ? (<LoadingBar />) : (
            <div>
              <Card.Title>Total Balance</Card.Title>
              <Card.Text>
                <BuyerDetail buyer={buyer} />
              </Card.Text>
              <Form>
                <Form.Group controlId="formBalance">
                  <Form.Control type="newBalance" placeholder="Enter New Balance" onChange={getNewBalance} />
                </Form.Group>
                <Button variant="primary" onClick={updateBalance}>Change Balance</Button>
              </Form>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Buyer;