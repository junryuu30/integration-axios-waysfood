import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Component, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./styles/style.css";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";

import Profile from "./Pages/Profile";
import Order from "./Pages/Order";


import HomeAdmin from "./Pages/Admin/HomeAdmin";
import AddProduct from "./Pages/Admin/AddProduct";
import ProfileAdmin from './Pages/Admin/ProfileAdmin'

import { CartContext } from "./Contexts/CartContext";
import EditAdmin from "./Pages/Admin/EditAdmin";
import { UserContext } from "./Contexts/userContext";
import { API, setAuthToken } from "./config/api";
import AllNavbar from "./Components/AllNavbar";
import DetailAllFood from "./Pages/DetailAllFood";
import Viewmap from "./Components/ViewMap";

// const PrivateRoute = () => {
//   const [state, dispatch] = useContext(UserContext)

//   return state.isLogin ? <Outlet /> : <Navigate to='/' />
// }

function App() {

  const [state, dispatch] = useContext(UserContext)
  console.log(state);

  const [cartLength, setCartLength] = useState(0);
  // const [dataCart, setDataCart] = useState([]);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      // console.log(response);

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();


  return (
    <CartContext.Provider value={{ cartLength, setCartLength }}>
        <QueryClientProvider client={client}>
          <AllNavbar/>
          <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<PrivateRoute/>}> */}
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/detail" element={<DetailAllFood />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            {/* <Route path="/edit-profile" element={<EditProfile />} /> */}

            <Route path="/view-map" element={<Viewmap/>} />
            <Route path="/income-transaction" element={<HomeAdmin />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile-user" element={<ProfileAdmin />} />
            <Route path='/edit-profile' element={<EditAdmin />} />
          </Routes>
        </QueryClientProvider>
      </CartContext.Provider>
  );
}

export default App;
