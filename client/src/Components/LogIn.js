import React, { Component } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import axios from  "axios";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleClick = () => {
    const { history } = this.props;
    history.push("/register");
  }

  logInUser = async => {

  }

  render() {
    return (
      <Container
        id="login-container"
        className="container justify-content-center"
      >
        <Row id="login-title-row" className="justify-content-center">
          <h3 className="mt-3 login-title">Log In</h3>
        </Row>
        <Row className="justify-content-center">
          {" "}
          <Form>
            <Form.Group>
              <Form.Label className="mt-2 login-label">Username</Form.Label>
              <Form.Control className="login-form-control" type="username" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="login-label">Password</Form.Label>
              <Form.Control className="login-form-control" type="username" />
            </Form.Group>
          </Form>
        </Row>
        <Row className="justify-content-center">
          <Button className="mt-2 d-inline-block" variant="light">
            Submit
          </Button>
        </Row>
        <Row className="justify-content-center">
          <Button onClick={this.handleClick} className="mt-4 d-inline-block" variant="light">
            Register An Account
          </Button>
        </Row>
      </Container>
    );
  }
}

export default LogIn;