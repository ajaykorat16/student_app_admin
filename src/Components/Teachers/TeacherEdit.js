import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class TeacherEdit extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      data: {},
      errors: {}
    };

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/teacher?id=${this.props.match.params.id}`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ data: response.data.data })
      }).catch(error => {
        console.log(error);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { name, promocode, age, gender, qualification, post, address, phone } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/teacher/edit`,
      { id: this.props.match.params.id, name, promocode, age, gender, qualification, post, address, phone },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/teachers');

      }).catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: {} });
          error.response.data.errors.forEach(columnError => {
            this.setState({ errors: { ...this.state.errors, [columnError.param]: columnError.msg } });
          });
        }
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <strong>Teacher Create</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Name</Label>
                    {!this.state.errors.name ? (
                      <Input type="text" placeholder="Name" value={this.state.data.name} onChange={(e) => { this.setState({ data: { ...this.state.data, name: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Name" value={this.state.data.name} onChange={(e) => { this.setState({ data: { ...this.state.data, name: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    {!this.state.errors.phone ? (
                      <Input type="text" placeholder="Phone" value={this.state.data.phone} onChange={(e) => { this.setState({ data: { ...this.state.data, phone: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Phone" value={this.state.data.phone} onChange={(e) => { this.setState({ data: { ...this.state.data, phone: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.phone}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Promocode</Label>
                    {!this.state.errors.promocode ? (
                      <Input type="text" placeholder="Promocode" value={this.state.data.promocode} onChange={(e) => { this.setState({ data: { ...this.state.data, promocode: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Promocode" value={this.state.data.promocode} onChange={(e) => { this.setState({ data: { ...this.state.data, promocode: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.promocode}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Age</Label>
                    {!this.state.errors.age ? (
                      <Input type="text" placeholder="Age" value={this.state.data.age} onChange={(e) => { this.setState({ data: { ...this.state.data, age: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Age" value={this.state.data.age} onChange={(e) => { this.setState({ data: { ...this.state.data, age: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.age}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Gender</Label>
                    {!this.state.errors.gender ? (
                      <Input type="select" value={this.state.data.gender} onChange={(e) => { this.setState({ data: { ...this.state.data, gender: e.target.value } }) }}>
                        <option value="">Select Gender</option>;
                        <option value="male">Male</option>;
                        <option value="female">Female</option>;
                        <option value="others">Others</option>;
                      </Input>
                    ) : (
                        <Input invalid type="select" value={this.state.data.gender} onChange={(e) => { this.setState({ data: { ...this.state.data, gender: e.target.value } }) }}>
                          <option value="">Select Gender</option>;
                          <option value="male">Male</option>;
                          <option value="female">Female</option>;
                          <option value="others">Others</option>;

                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.gender}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Qualification</Label>
                    {!this.state.errors.qualification ? (
                      <Input type="text" placeholder="Qualification" value={this.state.data.qualification} onChange={(e) => { this.setState({ data: { ...this.state.data, qualification: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Qualification" value={this.state.data.qualification} onChange={(e) => { this.setState({ data: { ...this.state.data, qualification: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.qualification}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Post</Label>
                    {!this.state.errors.post ? (
                      <Input type="text" placeholder="Post" value={this.state.data.post} onChange={(e) => { this.setState({ data: { ...this.state.data, post: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Post" value={this.state.data.post} onChange={(e) => { this.setState({ data: { ...this.state.data, post: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.post}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Address</Label>
                    {!this.state.errors.address ? (
                      <Input type="text" placeholder="Address" value={this.state.data.address} onChange={(e) => { this.setState({ data: { ...this.state.data, address: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Address" value={this.state.data.address} onChange={(e) => { this.setState({ data: { ...this.state.data, address: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.address}</FormFeedback>
                  </FormGroup>
                  <Button type="submit" color="success">Save</Button>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TeacherEdit
