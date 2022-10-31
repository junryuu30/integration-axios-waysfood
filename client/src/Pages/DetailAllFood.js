import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";

import { CartContext } from "../Contexts/CartContext";
import convertRupiah from "rupiah-format";

const DetailAllFood = () => {
  const { dataCart, setDataCart } = useContext(CartContext);

  const { cartLength, setCartLength } = useContext(CartContext)

  let { data: productsallfood } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const addToCartHandler = async (productId, productPrice) => {
    try {
      const response = await API.post(`/cart/add/${productId}`, {
        price: productPrice,
      });
      console.log('test ini productnya', response.data.data)
      refetch()
      const getCart = await API.get("/carts");
      setCartLength(getCart.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCartHandler = async (productId) => {
    try {
      const response = await API.patch(`/cart/update/${productId}`);
      if (response.data.data.qty === 0) {
        const response = await API.delete(`/cart/delete/${productId}`);
        setCartLength((prev) => prev - 1);
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const { data: cartData, refetch } = useQuery("cartCache", async () => {
    try {
      const response = await API.get("/carts");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });
  // calculate
  const allCartPrice = cartData?.map((item) => item.product.price * item.qty);
  const subTotal = allCartPrice?.reduce((a, b) => a + b, 0);
  console.log(subTotal);

  useEffect(() => {
    refetch();
  }, []);


  return (
    <Container>
      <h2 className="mt-5 mb-3">Food Near You</h2>
      <Row>
        {productsallfood?.map((item, index) => (
          <Col key={index} className="my-3 col-12 col-md-3">
            <Card style={{ width: "16rem", }} className="m-3">
              <div style={{ width: "100%", padding:"10px", }}>
                <Card.Img variant="top" src={item.image} />
              </div>
              <Card.Body>
                <Card.Text className="font-bold">{item.title}</Card.Text>
                <Card.Text className="text-price">
                  {convertRupiah.convert(item.price)}
                </Card.Text>
                <Button
                  className="bg-yellow btn-order"
                  // onClick={() => {
                  //   setDataCart([...dataCart, {}]);
                  // }}
                  onClick={() => addToCartHandler(item.id, item.price)}
                >
                  Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DetailAllFood;
