import { useContext, useState } from "react";
import { Badge, Button, Container, Dropdown, Navbar} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


import { CartContext } from "../Contexts/CartContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";

import userIcon from "../assets/user-icon.svg";
import logoutIcon from "../assets/logout-icon.svg";
import foodIcon from "../assets/food-icon.svg";
import money from "../assets/money.png";

import { UserContext } from "../Contexts/userContext";

function AllNavbar() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const { dataCart, setDataCart } = useContext(CartContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/"); 
  };

  return (
    <div>
      <Navbar className="bg-yellow" expand="lg">
        <Container className="d-flex ">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>WaysFood</Navbar.Brand>
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {!state.isLogin ? (
              <div>
                <Button
                  variant="btn btn-nav text-white mx-3"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
                <Button
                  variant="btn btn-nav text-white"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              </div>
            ) : state.user.role == "User" ? (
              <div>
                <Dropdown align="end">
                  <img
                    src={cart}
                    className="mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/order")}
                    alt=""
                  />
                  {dataCart.length > 0 && (
                    <Badge
                      style={{ width: "25px", height: "20px" }}
                      className="bg-danger position-absolute badge"
                    >
                      {dataCart.length}
                    </Badge>
                  )}
                  <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                    <img src={`http://localhost:5000/uploads/${state.user.image}`} alt="" width={40} height={40} className="rounded-circle" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile-user")}>
                      <img className="me-3" src={userIcon} alt=""/>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogut}>
                      <img className="me-3" src={logoutIcon} alt=""/>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Dropdown align="end">
                  <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic" >
                    <img src={`http://localhost:5000/uploads/${state.user.image}`} alt="" width={40} height={40} className="rounded-circle" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile-user")}>
                      <img className="me-3" src={userIcon} alt="" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/add-product")}>
                      <img className="me-3" src={foodIcon} alt=""/>
                      Add Product
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/income-transaction")}>
                      <img className="me-3" src={money} alt=""
                        style={{ width: "30px"}}
                      />
                      Income Transaction
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogut}>
                      <img className="me-3" src={logoutIcon} alt=""/>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
    </div>
  );
}

export default AllNavbar;