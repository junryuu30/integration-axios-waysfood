import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";

import { carts } from "../DataDummy/Cart";

import mapsImg from "../assets/maps-img.svg";
import mapsOder from '../assets/maps-order.svg'
import mapIcon from "../assets/map-icon.png";
import trash from "../assets/trash-icon.svg";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { CartContext } from "../Contexts/CartContext";

function Order() {
  const [show, setShow] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  // const { cartLength, setCartLength } = useContext(CartContext);

  // const addToCartHandler = async (productId, productPrice) => {
  //   try {
  //     const response = await API.post(`/cart/add/${productId}`, {
  //       price: productPrice,
  //     });
  //     console.log('test',response.data.data)
  //     refetch()
  //     const getCart = await API.get("/carts");
  //     setCartLength(getCart.data.data.length);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const deleteCartHandler = async (productId) => {
  //   try {
  //     const response = await API.patch(`/cart/update/${productId}`);
  //     if (response.data.data.qty === 0) {
  //       const response = await API.delete(`/cart/delete/${productId}`);
  //       setCartLength((prev) => prev - 1);
  //     }
  //     refetch();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const { data: cartData, refetch } = useQuery("cartCache", async () => {
  //   try {
  //     const response = await API.get("/carts");
  //     console.log(response.data.data);
  //     return response.data.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // // calculate
  // const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
  // const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);
  // console.log(subTotal);

  // useEffect(() => {
  //   refetch();
  // }, []);




  return (
    <Container>
      <h2 className="mt-5 mb-4">Geprek Bensu</h2>
      <h5 className=" mb-3">Delivery Location</h5>
      <Form className="row mb-5">
        <Form.Group className="mb-3 col-12 col-lg-9">
          <Form.Control
            type="text"
            placeholder="Enter location"
            className="p-2 border-0 border-form border-dark text-dark"
          />
        </Form.Group>
        <Form.Group className="col-12 col-lg-3">
          <div>
            <Button className="btn-map btn-nav p-2 mb-3" onClick={setShow}>
              Select On Map
              <img src={mapIcon} className="ms-3" alt="" />
            </Button>
            <Modal
              size="xl"
              show={show}
              onHide={() => setShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body>
                <img src={mapsImg} className="w-100" alt="" />
              </Modal.Body>
            </Modal>
          </div>
        </Form.Group>
      </Form>
      <div className="mt-4">
        <p className="fw-bold fs-5">Review Your Order</p>
        <Row>
          <Col className="col-lg-8">
            <hr />
          </Col>
          <Col className="d-none d-lg-block">
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            {carts.map((item, index) => (
              <Col key={index}>
                <Row className="d-flex align-items-center">
                  <Col>
                    <Row className="d-flex align-items-center text-start">
                      <Col className="col-3">
                        <img
                          src={item.image}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      </Col>
                      <Col className="col-9 ps-5 ps-lg-0">
                        <h6 className="my-3 fw-bold">{item.name}</h6>
                        <h6 className="my-3">
                          <span className="m-2"
                            style={{cursor:"pointer"}}
                          >
                            -
                            </span>
                          <Button className="bg-light border-0 rounded text-dark">
                            {item.qty}
                          </Button>
                          <span className="m-2"
                          style={{cursor:"pointer"}}
                          >
                            +
                            </span>
                        </h6>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="col-4 text-end">
                    <h6 className="text-danger my-3">{item.price}</h6>
                    <h6 className="text-danger my-3">
                      <img src={trash}  
                      style={{cursor:"pointer"}}
                      alt=""/>
                    </h6>
                  </Col>
                </Row>
                <hr />
              </Col>
            ))}
          </Col>

          <Col className="col-12 col-lg-4">
            <Col>
              <Row className="d-flex align-items-center mt-2">
                <Col>
                  <Row className="d-flex align-items-center text-start">
                    <Col>
                      <h6>Subtotal</h6>
                      <h6>Qty</h6>
                      <h6>Ongkir</h6>
                    </Col>
                    <Col className="text-end">
                      <h6>Rp. 30.000</h6>
                      <h6>2</h6>
                      <h6>Rp. 10.000</h6>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr style={{ marginTop: '30px' }} />
            </Col>
            <Col>
              <Row className="d-flex align-items-center">
                <Col>
                  <Row className="d-flex align-items-center text-start text-danger">
                    <Col>
                      <h6>Total</h6>
                    </Col>
                    <Col className="col-4 text-end">
                      <h6>Rp. 40.000</h6>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>

        <div>
        <Button className="btn-nav px-5 f-14 fw-bold float-end my-3 w-25" onClick={setShowOrder}>
          Order
        </Button>
          <Modal
            size="xl"
            show={showOrder}
            onHide={() => setShowOrder(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Body>
              <img src={mapsOder} className="w-100" />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Container>
  );
}

export default Order;
