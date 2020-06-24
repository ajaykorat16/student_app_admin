import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Alert, Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class DemoVideo extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      data: {},
      errors: {},
      alert: false
    };

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/demo_video?id=1`,
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
    const { video_url } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/demo_video/edit`,
      { id: 1, video_url },
      { headers: this.headers }
    )
      .then(res => {
        // history.push('/teachers');
        this.setState({ alert: true });

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
                <strong>Change Video</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <Alert color="success" isOpen={this.state.alert}>
                    Video updated successfully
                </Alert>
                  <FormGroup>
                    <Label>Video URL</Label>
                    {!this.state.errors.video_url ? (
                      <Input type="text" placeholder="Video URL" value={this.state.data.video_url} onChange={(e) => { this.setState({ data: { ...this.state.data, video_url: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Video URL" value={this.state.data.video_url} onChange={(e) => { this.setState({ data: { ...this.state.data, video_url: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.video_url}</FormFeedback>
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

export default DemoVideo
