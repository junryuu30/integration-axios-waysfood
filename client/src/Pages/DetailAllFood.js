import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";

import { CartContext } from "../Contexts/CartContext";
import convertRupiah from "rupiah-format";

const DetailAllFood = () => {
  const { dataCart, setDataCart } = useContext(CartContext);

  let { data: productsallfood } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });


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
                  onClick={() => {
                    setDataCart([...dataCart, {}]);
                  }}
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
