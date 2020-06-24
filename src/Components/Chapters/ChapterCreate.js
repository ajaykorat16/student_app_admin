import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class ChapterCreate extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      subjects: [],
      data: {},
      errors: {}
    };

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/chapters/get_subjects`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ subjects: response.data.data })
      }).catch(error => {
        console.log(error);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { subject_id, chapter_no, chapter_name } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/chapter/create`,
      {
        subject_id,
        chapter_no,
        chapter_name
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/chapters');

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
                <strong>Chapter Create</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Subject</Label>
                    {!this.state.errors.subject_id ? (
                      <Input type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, subject_id: e.target.value } }) }}>
                        <option value="">Select Subject</option>;
                        {this.state.subjects.map(subject => {
                          return <option key={subject.id} value={subject.id}>{subject.subject}</option>;
                        })}
                      </Input>
                    ) : (
                        <Input invalid type="select" onChange={(e) => {
                          this.setState({
                            data: {
                              ...this.state.data, subject_id: e.target.value
                            }
                          })
                        }}>
                          <option value="">Select Subject</option>;
                          {this.state.subjects.map(subject => {
                            return <option key={subject.id} value={subject.id}>{subject.subject}</option>;
                          })}
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.subject_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Chapter Number</Label>
                    {!this.state.errors.chapter_no ? (
                      <Input type="text" placeholder="Chapter Number" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_no: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Chapter Number" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_no: e.target.value } }) }} />
                      )}

                    <FormFeedback> {this.state.errors.chapter_no}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Chapter Name</Label>
                    {!this.state.errors.chapter_name ? (
                      <Input type="text" placeholder="Chapter Name" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_name: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Chapter Name" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_name: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.chapter_name}</FormFeedback>
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

export default ChapterCreate
