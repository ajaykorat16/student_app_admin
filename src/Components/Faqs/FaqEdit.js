import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class FaqEdit extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      chapters: [],
      data: {},
      errors: {}
    };

  }

  async componentDidMount() {
    var response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/topics/get_chapters`,
      { headers: this.headers }
    )
    this.setState({ chapters: response.data.data });

    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/faq?id=${this.props.match.params.id}`,
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
    const { chapter_id, type, question, answer } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/faq/edit`,
      {
        id: this.props.match.params.id,
        chapter_id, type, question, answer
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/faqs');

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
                <strong>Topic Edit</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Chapter</Label>
                    {!this.state.errors.chapter_id ? (
                      <Input type="select" value={this.state.data.chapter_id} onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_id: e.target.value } }) }}>
                        <option value="">Select Chapter</option>;
                        {this.state.chapters.map(chapter => {
                          return <option key={chapter.id} value={chapter.id}>{chapter.chapter}</option>;
                        })}
                      </Input>
                    ) : (
                        <Input invalid type="select" value={this.state.data.chapter_id} onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_id: e.target.value } }) }}>
                          <option value="">Select Chapter</option>;
                          {this.state.chapters.map(chapter => {
                            return <option key={chapter.id} value={chapter.id}>{chapter.chapter}</option>;
                          })}
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.chapter_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Type</Label>
                    {!this.state.errors.type ? (
                      <Input type="select" value={this.state.data.type} onChange={(e) => { this.setState({ data: { ...this.state.data, type: e.target.value } }) }}>
                        <option value="">Select Type</option>;
                        <option value="text">Text</option>;
                        <option value="video">Video</option>;
                      </Input>
                    ) : (
                        <Input invalid type="select" value={this.state.data.type} onChange={(e) => { this.setState({ data: { ...this.state.data, type: e.target.value } }) }}>
                          <option value="">Select Type</option>;
                          <option value="text">Text</option>;
                          <option value="video">Video</option>;
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.type}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Question</Label>
                    {!this.state.errors.question ? (
                      <Input type="text" placeholder="Question" value={this.state.data.question} onChange={(e) => { this.setState({ data: { ...this.state.data, question: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Question" value={this.state.data.question} onChange={(e) => { this.setState({ data: { ...this.state.data, question: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.question}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Answer</Label>
                    {!this.state.errors.answer ? (
                      <Input type="text" placeholder="Answer" value={this.state.data.answer} onChange={(e) => { this.setState({ data: { ...this.state.data, answer: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Answer" value={this.state.data.answer} onChange={(e) => { this.setState({ data: { ...this.state.data, answer: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.answer}</FormFeedback>
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

export default FaqEdit
