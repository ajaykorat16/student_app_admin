import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Topics extends Component {
  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      columns: [
        {
          label: 'Standard',
          field: 'standard',
          sort: 'asc'
        },
        {
          label: 'Subject',
          field: 'subject',
        },
        {
          label: 'Chapter',
          field: 'chapter',
        },
        {
          label: 'Topic Number',
          field: 'topic_no',
        },
        {
          label: 'Topic Name',
          field: 'topic_name',
        },
        {
          label: 'Status',
          field: 'is_active'
        },
        {
          label: 'Action',
          field: 'action'
        }

      ],
      rows: []
    };

  }

  changeStatus(topic_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/topic/change_status`,
      { topic_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getTopics();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteTopic(topic_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/topic/delete`,
      { id: topic_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getTopics();

      }).catch(error => {
        console.log(error);
      })
  }

  getTopics() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/topics`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(topic => {
          return {
            standard: topic.standard,
            subject: topic.subject,
            chapter: topic.chapter,
            topic_no: topic.topic_no,
            topic_name: topic.topic_name,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(topic.id)} ><Badge color={topic.is_active === 1 ? 'success' : 'secondary'}>{topic.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/topics/edit/${topic.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this topic?')) { this.deleteTopic(topic.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getTopics();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chapters
                <Link className="pull-right" to="/topics/create"><Button color="primary"> Create</Button></Link>
              </CardHeader>
              <CardBody>
                <MDBDataTable
                  striped
                  bordered
                  small={false}
                  data={this.state}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Topics;
