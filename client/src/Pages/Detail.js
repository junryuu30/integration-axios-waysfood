import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
// import { useParams, useNavigate } from "react-router-dom";

import { CartContext } from "../Contexts/CartContext";
// import { Food } from "../DataDummy/Food";
import convertRupiah from "rupiah-format";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { dataCart, setDataCart } = useContext(CartContext);

  // patching by id user

    const params = useParams()
    const navigate = useNavigate()
    const { cartLength, setCartLength } = useContext(CartContext)


    let { data: productbyuser } = useQuery('productsbyuserCache', async () => {
        const response = await API.get(`/products/${params.id ? params.id : user.id}`)
        return response.data.data
    })

    let { data: user } = useQuery('userCache', async () => {
        const response = await API.get(`/user/${params.id}`)
        // console.log(user.products.title)
        return response.data.data
    })

    const addToCartHandler = async (productId, productPrice) => {
      try {
        const response = await API.post(`/cart/add/${productId}`, {
          price: productPrice,
        });
        const getCart = await API.get("/carts");
        setCartLength(getCart.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };



  return (
    <Container>
      <h2 className="mt-5 mb-3">{user?.fullName} Menu'S</h2>
      <Row>
        {productbyuser?.map((item, index) => (
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
                  // onClick={() => {setDataCart([...dataCart, {}]);
                  //   // console.log(dataCart);
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

export default Detail;
