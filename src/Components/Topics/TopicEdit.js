import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input, FormFeedback, Form, Button }
  from 'reactstrap';
import axios from 'axios';

class TopicEdit extends Component {
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

    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/topic?id=${this.props.match.params.id}`,
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
    const { chapter_id, topic_no, topic_name, video_url, is_free, meta_text, meta_description } = this.state.data;

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/topic/edit`,
      {
        id: this.props.match.params.id,
        chapter_id, topic_no, topic_name, video_url, is_free, meta_text, meta_description
      },
      { headers: this.headers }
    )
      .then(res => {
        history.push('/topics');

      }).catch(error => {
        if (error.response.status === 422) {
          this.setState({ errors: {} });
          error.response.data.errors.forEach(columnError => {
            this.setState({ errors: { ...this.state.errors, [columnError.param]: columnError.msg } });
          });
        }
      });
  }

  toggleChange = () => {
    this.setState({ data: { ...this.state.data, is_free: !this.state.data.is_free } })
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
                      <Input value={this.state.data.chapter_id} type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_id: e.target.value } }) }}>
                        <option value="">Select Chapter</option>;
                        {this.state.chapters.map(chapter => {
                          return <option key={chapter.id} value={chapter.id}>{chapter.chapter}</option>;
                        })}
                      </Input>
                    ) : (
                        <Input value={this.state.data.chapter_id} invalid type="select" onChange={(e) => { this.setState({ data: { ...this.state.data, chapter_id: e.target.value } }) }}>
                          <option value="">Select Chapter</option>;
                          {this.state.chapters.map(chapter => {
                            return <option key={chapter.id} value={chapter.id}>{chapter.chapter}</option>;
                          })}
                        </Input>
                      )}

                    <FormFeedback> {this.state.errors.chapter_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Topic Number</Label>
                    {!this.state.errors.topic_no ? (
                      <Input value={this.state.data.topic_no} type="text" placeholder="Topic Number" onChange={(e) => { this.setState({ data: { ...this.state.data, topic_no: e.target.value } }) }} />
                    ) : (
                        <Input value={this.state.data.topic_no} invalid type="text" placeholder="Topic Number" onChange={(e) => { this.setState({ data: { ...this.state.data, topic_no: e.target.value } }) }} />
                      )}

                    <FormFeedback> {this.state.errors.topic_no}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Topic Name</Label>
                    {!this.state.errors.topic_name ? (
                      <Input type="text" placeholder="Topic Name" value={this.state.data.topic_name} onChange={(e) => { this.setState({ data: { ...this.state.data, topic_name: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Topic Name" value={this.state.data.topic_name} onChange={(e) => { this.setState({ data: { ...this.state.data, topic_name: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.topic_name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Video URL</Label>
                    {!this.state.errors.video_url ? (
                      <Input type="text" placeholder="Video URL" value={this.state.data.video_url} onChange={(e) => { this.setState({ data: { ...this.state.data, video_url: e.target.value } }) }} />
                    ) : (
                        <Input invalid type="text" placeholder="Video URL" value={this.state.data.video_url} onChange={(e) => { this.setState({ data: { ...this.state.data, video_url: e.target.value } }) }} />
                      )}
                    <FormFeedback> {this.state.errors.video_url}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>Meta Text</Label>
                    <Input type="text" placeholder="Meta Text" value={this.state.data.meta_text || ''} onChange={(e) => { this.setState({ data: { ...this.state.data, meta_text: e.target.value } }) }} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Meta Description</Label>
                    <Input type="textarea" placeholder="Meta Description" value={this.state.data.meta_description || ''} onChange={(e) => { this.setState({ data: { ...this.state.data, meta_description: e.target.value } }) }} />
                  </FormGroup>

                  <FormGroup row>
                    <Col md="6">
                      <Label>Is Free</Label><br></br>
                      <FormGroup check inline>
                        <Input checked={this.state.data.is_free} className="form-check-input" type="checkbox" onChange={this.toggleChange} />
                      </FormGroup>
                    </Col>
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

export default TopicEdit
