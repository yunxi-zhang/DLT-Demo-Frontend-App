import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import BuyerBalance from './BuyerBalance';
import BuyerId from './BuyerId';
import BuyerType from './BuyerType';
import LoadingBar from "../loading/Loading";
require('dotenv').config();
let getBuyerBalanceAPI;
let updateBuyerBalanceAPI;
if (process.env.REACT_APP_API_MANAGEMENT_ENABLED === "true") {
  getBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/buyer/balance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
  updateBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/buyer/updateBalance?subscription-key=' + process.env.REACT_APP_API_MANAGEMENT_SUBSCRIPTION_KEY;
} else {
  getBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/buyer/list';
  updateBuyerBalanceAPI = process.env.REACT_APP_BUYER_API_HOSTNAME + ':' + process.env.REACT_APP_BUYER_API_PORT + '/updateBalance';
}

const Buyer = () => {
  const [buyers, setBuyers] = useState([]);
  const [newBuyerBalance, setNewBuyerBalance] = useState(0);
  const [caller, setCaller] = useState(false);

  useEffect(() => {
    axios.all([
      axios.get(getBuyerBalanceAPI),
    ])
      .then((res) => {
        console.log("buyers:", res[0].data);
        setBuyers(res[0].data)
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
            setBuyers(res[0].data)
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  return (
    <div>
      {
        buyers.map((buyer, index) => (
          <Card border="primary" className="text-center">
            <Card.Header as="h3">Buyer-{index + 1}</Card.Header>
            <Card.Body>
              {caller ? (<LoadingBar />) : (
                <div>
                  <Card.Title><b>Id:</b><BuyerId buyer={buyer} /></Card.Title>
                  <Card.Title><b>Total Balance:</b><BuyerBalance buyer={buyer} /></Card.Title>
                  <Card.Title><b>Type:</b><BuyerType buyer={buyer} /></Card.Title>
                  {/* <Form>
                    <Form.Group controlId="formBalance">
                      <Form.Control type="newBalance" placeholder="Enter New Balance" onChange={getNewBalance} />
                    </Form.Group>
                    <Button variant="primary" onClick={updateBalance}>Change Balance</Button>
                  </Form> */}
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      }
    </div>
  );
}

export default Buyer;