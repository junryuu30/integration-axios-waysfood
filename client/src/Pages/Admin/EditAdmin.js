import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import FormAll from "../../Components/Atoms/FormAll";

import mapIcon from "../../assets/map-icon.png";
import mapsImg from "../../assets/maps-img.svg";
import iconFile from "../../assets/icon-file.svg";
import { UserContext } from "../../Contexts/userContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";
// import { ProfileContext } from "../../Contexts/profileContext";

function EditAdmin() {
  const navigate = useNavigate();

  // const [preview, setPreview] = useState(null);

  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  console.log("state edit product", state);

  const [form, setForm] = useState({
    fullName: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  });

  let { data: user } = useQuery("userEditCache", async () => {
    const response = await API.get(`user/${state.user.id}`);
    return response.data.data;
  });

  console.log("ini data edit profile", form);
  useEffect(() => {
    if (user) {
      setPreview(user.image);
      setForm({
        ...form,
        fullName: user.fullNname,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // return console.log("ini data form", form);

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      // Insert product data
      const response = await API.patch("/user/" + user.id, formData);

      const auth = await API.get("/check-auth");
      // console.log(response);

      let payload = auth.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      console.log("ini data updated user", response.data);
      navigate("/profile-user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2 className="my-5">Edit Profile</h2>
      <Form>
        <Row>
          <Col className="col-12 col-md-9">
            <FormAll
              label="Full Name"
              type="text"
              placeholder="Full Name"
              className="border-form border-dark text-dark"
              name="fullName"
              defaultValue={form?.fullName}
              onChange={handleChange}
              style={{ color:"black" }}
            />
          </Col>
          <Col className="col-12 col-md-3">
            <Form.Group
              className="mb-3 d-flex"
              controlId="formBasicEmail"
              style={{ height: "90%" }}
            >
              <Form.Control
                type="file"
                placeholder="Attach Image"
                hidden
                name="image"
                onChange={handleChange}
              />
              <Form.Label className="d-flex align-items-center border-form border-dark input-img border border-1 ">
                Attach Image
                {preview && (
                  <div>
                    <img
                      src={preview}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                      alt="preview"
                    />
                  </div>
                )}
              </Form.Label>
              <img
                src={iconFile}
                style={{
                  marginLeft: "-30px",
                  paddingBottom: "8px",
                  width: "20px",
                }}
                alt=""
              />
            </Form.Group>
          </Col>
        </Row>
        <FormAll
          label="Email"
          type="email"
          placeholder="Email"
          className="border-form border-dark text-dark"
          defaultValue={form?.email}
          name="email"
          onChange={handleChange}
        />
        <FormAll
          label="Phone"
          type="text"
          placeholder="Phone"
          className="border-form border-dark text-dark"
          name="phone"
          onChange={handleChange}
        />
        <Row>
          <Col className="col-12 col-md-9">
            <FormAll
              label="Location"
              type="text"
              placeholder="Location"
              className="border-form border-dark text-dark"
              name="location"
              onChange={handleChange}
            />
          </Col>
          <Col className="col-12 col-md-3">
            <div>
              <Button
                className="btn-map btn-nav p-2 mb-3"
                style={{ height: "55px" }}
                onClick={setShow}
                type="submit"
              >
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
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            className="btn-nav w-25 my-5 "
            type="submit"
            // onClick={() => navigate("/profile-admin")}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditAdmin;
