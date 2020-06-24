import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: ""
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    // const user = this.state;
    const headers = {
      'Content-Type': 'application/json'
    };
    const { email, password } = this.state;
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/login`,
      {
        email,
        password
      },
      headers
    )
      .then(res => {
        localStorage.setItem('auth', JSON.stringify(res.data.token));
        localStorage.setItem('user', res.data.data);
        history.push('/dashboard');
      }).catch(error => {
        this.setState({ errorMessage: error.response.data.message });

      });
  }
  render() {
    const mystyle = {
      display: "block"
    };
    var auth = JSON.parse(localStorage.getItem('auth'));
    return (
      <div className="app flex-row align-items-center">
        {auth ? <Redirect to="/dashboard"></Redirect> : null}
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" autoComplete="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        {this.state.errorMessage &&
                          <div style={mystyle} className="invalid-feedback">{this.state.errorMessage}</div>}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

export default Login;
