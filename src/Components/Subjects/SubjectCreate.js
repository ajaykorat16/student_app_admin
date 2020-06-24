import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class SubjectCreate extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      standards: [],
      data: {},
      errors: {}
    };

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/standards`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ standards: response.data.data })
      }).catch(error => {
        console.log(error);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { standard_id, subject, price } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/subject/create`,
      {
        standard_id,
        subject,
        price
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/subjects');

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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <strong>Standard Create</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Standard</Label>
                    {!this.state.errors.standard_id ? (
                      <Input type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, standard_id: e.target.value } }) }}>
                        <option value="">Select Standard</option>;
                        {this.state.standards.map(standard => {
                          return <option key={standard.id} value={standard.id}>{standard.name}</option>;
                        })}
                      </Input>
                    ) : (
                        <Input invalid type="select" onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data, standard_id: e.target.value
                            }
                          })
                        }}>
                          <option value="">Select Standard</option>;
                          {this.state.standards.map(standard => {
                            return <option key={standard.id} value={standard.id}>{standard.name}</option>;
                          })}
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.standard_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Subject</Label>
                    {!this.state.errors.subject ? (
                      <Input type="text" placeholder="Subject" onChange={(e) => { this.setState({ data: { ...this.state.data, subject: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Subject" onChange={(e) => { this.setState({ data: { ...this.state.data, subject: e.target.value } }) }} />
                      )}

                    <FormFeedback> {this.state.errors.subject}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Price</Label>
                    {!this.state.errors.price ? (
                      <Input type="text" placeholder="Price" onChange={(e) => { this.setState({ data: { ...this.state.data, price: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Price" onChange={(e) => { this.setState({ data: { ...this.state.data, price: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.price}</FormFeedback>
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

export default SubjectCreate
