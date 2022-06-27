import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { savePaymentMethod, saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../Components/CheckOutSteps";

function PaymentScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form as="legend">Select Method</Form>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" className="btn btn-secondary my-3 px-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
