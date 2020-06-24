import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class TestCreate extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      subjects: [],
      chapters: [],
      data: {
        questions: [
          {
            "question": "",
            "answer": "",
            "type": "without_options",
            "marks": "",
          },
        ]
      },
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
    const { subject_id, type, name, marks, chapters, questions } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/test/create`,
      { subject_id, type, name, marks, chapters, questions },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/tests');

      }).catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: {} });
          error.response.data.errors.forEach(columnError => {
            this.setState({ errors: { ...this.state.errors, [columnError.param]: columnError.msg } });
          });
        }
      });
  }

  onSubjectChange = event => {
    this.setState({ data: { ...this.state.data, subject_id: event.target.value } });

    if (typeof event.target.value != "undefined") {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/test/get_chapters_from_subject?subject_id=${event.target.value}`,
        { headers: this.headers }
      )
        .then(response => {
          this.setState({ chapters: response.data.data })
        }).catch(error => {
          console.log(error);
        })
    }
  }
  onQuestionChange = (key, field, e) => {
    let questionsCopy = this.state.data.questions;
    if (field === 'options') {
      let options = e.target.value.split(',').map(function (item) {
        return item.trim();
      });;
      questionsCopy[key][field] = options;
    } else {
      questionsCopy[key][field] = e.target.value;
    }

    this.setState({ data: { ...this.state.data, questions: questionsCopy } });

  }

  addQuestionGroup = () => {
    let questionsCopy = this.state.data.questions;
    questionsCopy.push({
      "question": "",
      "answer": "",
      "type": "without_options",
      "marks": "",
    });
    this.setState({ data: { ...this.state.data, questions: questionsCopy } });
  }

  removeQuestion = (key, e) => {
    let questionsCopy = this.state.data.questions;
    questionsCopy.splice(key, 1);
    this.setState({ data: { ...this.state.data, questions: questionsCopy } });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <strong>Test Create</strong>
              </CardHeader>
              <Form onSubmit={this.handleSubmit}>
                <CardBody>
                  <FormGroup>
                    <Label>Subjects</Label>
                    {!this.state.errors.subject_id ? (
                      <Input type="select" onChange={this.onSubjectChange}>
                        <option value="">Select Subject</option>;
                        {this.state.subjects.map(subject => {
                          return <option key={subject.id} value={subject.id}>{subject.subject}</option>;
                        })}
                      </Input>
                    ) : (
                        <Input invalid type="select" onChange={this.onSubjectChange}>
                          <option value="">Select Subject</option>;
                          {this.state.subjects.map(subject => {
                            return <option key={subject.id} value={subject.id}>{subject.subject}</option>;
                          })}
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.subject_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Type</Label>
                    {!this.state.errors.type ? (
                      <Input type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, type: e.target.value } }) }}>
                        <option value="">Select Type</option>;
                        <option value="mock">Mock</option>;
                        <option value="practice">Practice</option>;
                      </Input>
                    ) : (
                        <Input invalid type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, type: e.target.value } }) }}>
                          <option value="">Select Type</option>;
                          <option value="mock">Mock</option>;
                          <option value="practice">Practice</option>;

                        </Input>
                      )}
                    <FormFeedback> {this.state.errors.type}</FormFeedback>
                  </FormGroup>
                  {this.state.data.type === 'practice' &&
                    <FormGroup>
                      <Label>Chapters</Label>
                      <Input multiple type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, chapters: [...e.target.selectedOptions].map(o => o.value) } }) }}>
                        <option value="">Select Chapter</option>;
                        {this.state.chapters.map(chapter => {
                          return <option key={chapter.id} value={chapter.id}>{chapter.chapter_no}=> {chapter.chapter_name}</option>;
                        })}
                      </Input>
                    </FormGroup>
                  }
                  <FormGroup>
                    <Label>Name</Label>
                    {!this.state.errors.name ? (
                      <Input type="text" placeholder="Name" onChange={(e) => { this.setState({ data: { ...this.state.data, name: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Name" onChange={(e) => { this.setState({ data: { ...this.state.data, name: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Marks</Label>
                    {!this.state.errors.marks ? (
                      <Input type="text" placeholder="Marks" onChange={(e) => { this.setState({ data: { ...this.state.data, marks: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Marks" onChange={(e) => { this.setState({ data: { ...this.state.data, marks: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.marks}</FormFeedback>
                  </FormGroup>
                  {
                    this.state.data.questions.map((value, questionKey) => {
                      return (
                        <Card key={questionKey}>
                          <CardHeader>
                            <i className="fa fa-info"></i>Question - {questionKey + 1}
                            <div className="card-header-actions">
                              <Button color="link" className="card-header-action btn-close" onClick={this.removeQuestion.bind(this, questionKey)}><i className="icon-close"></i></Button>
                            </div>
                          </CardHeader>
                          <CardBody>
                            <FormGroup>
                              <Label>Question</Label>
                              <Input placeholder="Question name" type="text" onChange={this.onQuestionChange.bind(this, questionKey, 'question')} />
                            </FormGroup>
                            <FormGroup>
                              <Label>Answer</Label>
                              <Input placeholder="Write Correct Answer" type="text" onChange={this.onQuestionChange.bind(this, questionKey, 'answer')} />
                            </FormGroup>
                            <FormGroup>
                              <Label>Marks</Label>
                              <Input placeholder="Marks" type="text" onChange={this.onQuestionChange.bind(this, questionKey, 'marks')} />
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3">
                                <Label>Type</Label>
                              </Col>
                              <Col md="9">
                                <FormGroup check className="radio">
                                  <Input key={questionKey} className="form-check-input" type="radio" value="without_options" onChange={this.onQuestionChange.bind(this, questionKey, 'type')}
                                    checked={this.state.data.questions[questionKey].type === "without_options"}
                                  />
                                  <Label check className="form-check-label">Without Options</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                  <Input onChange={this.onQuestionChange.bind(this, questionKey, 'type')} className="form-check-input" type="radio" key={questionKey} value="with_options"
                                    checked={this.state.data.questions[questionKey].type === "with_options"}
                                  />
                                  <Label check className="form-check-label"
                                  >With Options</Label>
                                </FormGroup>
                              </Col>
                            </FormGroup>
                            {this.state.data.questions[questionKey].type === 'with_options' &&
                              <FormGroup>
                                <Label>Options</Label>
                                <Input placeholder="Write Options with comma separtion" type="text" onChange={this.onQuestionChange.bind(this, questionKey, 'options')} />
                              </FormGroup>
                            }
                          </CardBody>
                        </Card>
                      )
                    })
                  }
                  <Button type="submit" color="success">Save</Button>
                  <Button onClick={this.addQuestionGroup} type="button" color="info" className="pull-right">Add Question</Button>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TestCreate
