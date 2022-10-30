import { Button, Col, Container, Form, Row } from "react-bootstrap";

import React, { useState } from "react";
import { useMutation } from "react-query";

import { API } from "../../config/api";

import FormAll from "../../Components/Atoms/FormAll";
import iconFile from "../../assets/icon-file.svg";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(e.target.name, e.target.files);
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    // return console.log(form);
    try {
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image, form.image.name);
      formData.set("price", form.price);

      const data = await API.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/detail");

      console.log("ini add product", data);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Container>
      <h2 className="my-5">Add Product</h2>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-12 col-md-9">
            <FormAll
              label="Title"
              type="text"
              placeholder="Title"
              className="border-form border-dark text-dark"
              onChange={handleChange}
              name="title"
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
                name="image"
                onChange={handleChange}
                hidden
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
                    alt={preview}
                  />
                </div>
              )}
              </Form.Label>
              <img
                src={iconFile}
                alt=""
                style={{
                  marginLeft: "-30px",
                  paddingBottom: "8px",
                  width: "20px",
                }}
              />

            </Form.Group>
          </Col>
        </Row>
        <FormAll
          label="Price"
          type="text"
          placeholder="Price"
          className="border-form border-dark text-dark"
          name="price"
          onChange={handleChange}
        />
        <div className="d-flex justify-content-end">
          <Button
            className="btn-nav w-25 mt-5 "
            type="submit"
            // onClick={() => navigate("/home-admin")}
          >
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
