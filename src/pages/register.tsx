import Navbar from "../components/Navbar";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { registerUser, reset } from "../features/auth/authSlice";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = registerData;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      return;
    }

    dispatch(registerUser(registerData));

    setRegisterData({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };

  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      console.error("Something went wrong...");
    }

    if (isSuccess || user) {
      navigate("/posts");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  return (
    <div>
      <Navbar />

      <Container className="p-4 vh-100">
        <h2 className="mt-4 mb-4 display-6 text-primary">
          Please create an account
        </h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={changeHandler}
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={changeHandler}
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={changeHandler}
              name="password"
            />
          </Form.Group>

          <Form.Group
            className="mb-4"
            controlId="formBasicPasswordConfirmation"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={changeHandler}
              name="passwordConfirm"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="border" /> : "Create Account"}
          </Button>

          {isLoading && (
            <p className="text-center text-danger">
              Loading times may be long due to use of free Render Plan
            </p>
          )}
        </Form>
      </Container>

      <Footer />
    </div>
  );
};
export default Register;
