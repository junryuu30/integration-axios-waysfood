import React from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { API } from '../../config/api';

import FormAll from "../Atoms/FormAll";

function Register({show, setShow, setShowLogin}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender:"",
    phone:"",
    role:"",
  });

  const { email, password, fullName, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = (
        <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
      );

      setMessage(alert);

      console.log("ini response register", response);
    } catch (e) {
      console.log(e);
      const alert = (
        <Alert variant="danger">Register Filed!</Alert>
      );

      setMessage(alert);
    }
  });
  


  return(
    <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <form onSubmit={(e)=>handleSubmit.mutate(e)}>
              <div className="text-yellow m-3">
                <h2>Register</h2>
              </div>
              <div>
                <FormAll 
                label="Email" 
                type="email" 
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                />
                <FormAll 
                label="Password" 
                type="password" 
                placeholder="password"
                value={password}
                name="password"
                onChange={handleChange}
                />
                <FormAll
                  label="Full Name"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  name="fullName"
                  onChange={handleChange}
                />
                <Form.Select aria-label="Default select example m-3"
                value={gender}
                name="gender"
                onChange={handleChange}
                >
                  <option>Gender</option>
                  <option value="Laki-laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
                <FormAll
                  label="Phone Number"
                  value={phone}
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  placeholder="Phone Number"
                  className='mt-3'
                />
                <Form.Select 
                aria-label="Default select example m-3"
                value={role}
                name="role"
                onChange={handleChange}
                >
                  <option hidden>Role</option>
                  <option value="User">User</option>
                  <option value="Patner">Patner</option>
                </Form.Select>
              </div>
              <Button type="submit" onClick={() => setShow(false)} className="btn-order btn-nav mt-3">
              Register
             </Button>
            </form>
           
            <p className="mt-3">
              Already have an account ?  {" "}
              <span className="fw-bold" 
              style={{ cursor:"pointer"}}
              onClick={() => {
                setShow(false)
                setShowLogin(true)
              }}>
                Click-Here
              </span>
            </p>
          </Modal.Body>
        </Modal>
    </>
  );
}

export default Register;
