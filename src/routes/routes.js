import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from '../components/welcome/Welcome';
import Bank from '../components/bank/Bank';
import Buyer from '../components/buyer/Buyer';
import Seller from '../components/seller/Seller';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function Routing() {
  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">DLT-Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/bank">Bank</Nav.Link>
              <Nav.Link href="/buyer">Buyer</Nav.Link>
              <Nav.Link href="/seller">Seller</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/bank" component={Bank} />
          <Route exact path="/buyer" component={Buyer} />
          <Route exact path="/seller" component={Seller} />
        </div>
      </Router>
    </div>
  )
}

export default Routing;