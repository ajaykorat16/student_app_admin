import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class StandardsEdit extends Component {
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

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/standard?id=${this.props.match.params.id}`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ data: { standard: response.data.data.name } })
      }).catch(error => {
        console.log(error);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { standard } = this.state.data;
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/standard/edit`,
      {
        id: this.props.match.params.id,
        standard
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/standards');
      }).catch(error => {
        if (error.response.status === 422) {
          const [errorData] = error.response.data.errors;
          this.setState({ error: { standard: errorData.msg } });
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
                <strong>Standard Edit</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Standard</Label>
                    {!this.state.error.standard ? (
                      <Input type="text" placeholder="Standard" value={this.state.data.standard} onChange={(e) => { this.setState({ data: { standard: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Standard" value={this.state.data.standard} onChange={(e) => { this.setState({ data: { standard: e.target.value } }) }} />
                      )}

                    <FormFeedback> {this.state.error.standard}</FormFeedback>
                  </FormGroup>
                  <Button type="submit" color="success">Update</Button>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StandardsEdit
