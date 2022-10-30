import { Col, Container, Image, Row } from "react-bootstrap"

import pizza from '../assets/logo-pizza.svg'
import strips from '../assets/strips.svg'

const Header = () => {
    return (
        <Container fluid className="bg-yellow">
            <Row className="header-text d-flex align-items-center">
                <Col className='col-12 col-lg-6'>
                    <h1>Are You Hungry? <br /> Express Home Delivery</h1>
                    <Row>
                        <Col className="col-12 col-lg-4">
                            <img src={strips} className='me-4' />
                        </Col>
                        <Col>
                            <p className="ff-Avenir">Let's Order many foods for boost your energy, your mood and make your life better because happy or send to your beloved people.</p>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Image src={pizza} className='my-5 px-5' />
                </Col>
            </Row>
        </Container>
    )
}

export default Header