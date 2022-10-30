import { useContext, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { UserContext } from "../Contexts/userContext"
import { useNavigate } from "react-router-dom"
import cake from "../../src/assets/cake1.jpg"


import { Patners } from '../DataDummy/Patners'
import { API } from "../config/api"
import { useQuery } from "react-query"
import Login from "./Auth/Login"
import Register from "./Auth/Register"



// const CardPatner = ({item})=>{
//     const [state] = useContext(UserContext);
//     const navigate = useNavigate()
//     const [showLogin, setShowLogin] = useState(false);
//     const handleShowLog = () => {
//         setShowLogin(true)
//     };

//     return (
//         <Container>  
//             <Row onClick={!state.isLogin ? () => navigate(`/detail`) : handleShowLog}>
//                 {/* {Patners.map((item, index) => ())} */}
//                     {/* <Col key={index} className="my-3 col-12 col-md-3"> */}
//                     <Col 
//                     className="my-3 col-12 col-md-3">
//                         <Card width='18 rem' style={{ cursor:"pointer" }}>
//                             <Card.Body className="d-flex align-items-center shadow">
//                                 <Card.Img variant="top" src={item.image} style={{ width: '50px', marginRight:'15px' }} />
//                                 <Card.Title>{}</Card.Title>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//             </Row>
//         </Container>
//     )

// }


function ContentPatner() {
    const [state] = useContext(UserContext);
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState(false);
    const handleShowLog = () => {
        setShowLogin(true)
    };

    const [showRegister, setShowRegister] = useState(false);

    let { data: users } = useQuery('usersCache', async () => {
        const response = await API.get('/users')
        return response.data.data
    })    

    return(
        <>
    <Container>
        <h2 className='mt-4'>Popular Restaurants</h2>
                <div className="">

                    <Row 
                    className=''>

                        {users?.length !== 0 ? (
                            <>
                            <Col className=" col-12 col-md-1 d-flex" >
                                {users?.map((item, index) => (item.role === "Patner" &&
                                <div className="d-flex">
                                    <Card onClick={state.isLogin ? () => navigate(`/detail/${item.id}`) : handleShowLog}
                                    style={{ cursor:"pointer", width:"230px"}} 
                                    key={index}
                                    className="m-1">
                                        <Card.Body className="d-flex justify-content-center align-items-center">
                                            <Card.Img variant="top" src={item.image} style={{ width: '100px', marginRight:'15px' }} className="rounded-circle" />
                                            <Card.Title>{item.fullName}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                                 ))}
                            </Col>
                            </>

                        ) : (
                            <Col>
                                <div className="text-center pt-5">
                                    {/* <img
                                        src={emptyImage}
                                        className="img-fluid"
                                        style={{ width: "40%" }}
                                        alt="empty"
                                    /> */}
                                    <div className="mt-3">No data partner</div>
                                </div>
                            </Col>
                        )}
                    </Row>

                </div>
    </Container>
    <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
    />
    <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />

    </>
    )
   
}

export default ContentPatner
