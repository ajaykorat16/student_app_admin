import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class StandardsCreate extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      data: {
        standard: ""
      },
      error: {
        standard: ""
      }

    };

  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { standard } = this.state.data;
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/standard/create`,
      {
        standard
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/standards');

      }).catch(error => {
        if (error.response.status === 422) {
          const [errorData] = error.response.data.errors;
          console.log(this.state);
          this.setState({ error: { standard: errorData.msg } });
          console.log(this.state);
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
                    {!this.state.error.standard ? (
                      <Input type="text" placeholder="Standard" onChange={(e) => { this.setState({ data: { standard: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Standard" onChange={(e) => { this.setState({ data: { standard: e.target.value } }) }} />
                      )}

                    <FormFeedback> {this.state.error.standard}</FormFeedback>
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

export default StandardsCreate
