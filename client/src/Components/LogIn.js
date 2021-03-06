import React, { Component } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import AlertComponent from "./AlertComponent";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      setShow: false,
      errorMessage: "",
    };
  }

  handleClick = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleChange = (event) => {
    this.setState({
      errorMessage: "",
      setShow: false,
    });
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    const newUser = {
      username: username,
      password: password,
    };

    this.logInUser(newUser);
  };

  logInUser = async (user) => {
    const { history } = this.props;
    await axios
      .post("api/authorize/login", user)
      .then((res) => {
        console.log(res);
        const userSpecs = {
          id: res.data.userMatch.user.id,
          username: res.data.userMatch.user.username,
        };
        const token = res.data.userMatch.secretToken;
        if (res.status === 201) {
          localStorage.setItem("user", JSON.stringify(userSpecs));
          localStorage.setItem("id_token", JSON.stringify(token));
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Incorrect password") {
          this.setState({
            errorMessage: "You've entered an incorrect password.",
            setShow: true,
          });
        }
        if (err.response.data.message === "unregistered user") {
          this.setState({
            errorMessage:
              "The username entered doesn't exist. Please register.",
            setShow: true,
          });
        }
      });
  };

  renderAlert = () => {
    if (this.state.errorMessage !== "") {
      return (
        <AlertComponent
          setShow={this.state.setShow}
          errorMessage={this.state.errorMessage}
        />
      );
    }
  };

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
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label className="mt-2 login-label">Username</Form.Label>
              <Form.Control
                name="username"
                onChange={this.handleChange}
                className="login-form-control"
                type="input"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="login-label">Password</Form.Label>
              <Form.Control
                autoComplete="off"
                name="password"
                onChange={this.handleChange}
                className="login-form-control"
                type="password"
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-2 d-inline-block auth-button"
              variant="light"
            >
              Submit
            </Button>
          </Form>
        </Row>
        <Row className="justify-content-center"></Row>
        <Row className="justify-content-center">
          <Button
            onClick={this.handleClick}
            className="mt-4 d-inline-block auth-button"
            variant="light"
          >
            Register An Account
          </Button>
        </Row>
        <Row className="justify-content-center">{this.renderAlert()}</Row>
      </Container>
    );
  }
}

export default LogIn;
