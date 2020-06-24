import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Tests extends Component {
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
          label: 'Chapters',
          field: 'chapters',
        },
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Marks',
          field: 'marks',
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

  changeStatus(test_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/test/change_status`,
      { test_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getTests();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteTest(test_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/test/delete`,
      { id: test_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getTests();

      }).catch(error => {
        console.log(error);
      })
  }

  getTests() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tests`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(test => {
          return {
            standard: test.standard,
            subject: test.subject,
            chapters: test.chapters,
            type: test.type,
            name: test.name,
            marks: test.marks,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(test.id)} ><Badge color={test.is_active === 1 ? 'success' : 'secondary'}>{test.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/tests/edit/${test.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this test?')) { this.deleteTest(test.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getTests();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Tests
                <Link className="pull-right" to="/tests/create"><Button color="primary"> Create</Button></Link>
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

export default Tests;
