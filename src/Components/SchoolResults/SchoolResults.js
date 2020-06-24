import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class SchoolResults extends Component {
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
          label: 'Student',
          field: 'student',
          sort: 'asc'
        },
        {
          label: 'City',
          field: 'city',
        },
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
          label: 'School Name',
          field: 'school_name',
        },
        {
          label: 'Term',
          field: 'term',
        },
        {
          label: 'Marks',
          field: 'marks',
        }
      ],
      rows: []
    };

  }

  getSchoolResults() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/school_results`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(school_result => {
          return {
            student: school_result.student,
            city: school_result.city,
            standard: school_result.standard,
            subject: school_result.subject,
            school_name: school_result.school_name,
            term: school_result.term,
            marks: school_result.marks,
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getSchoolResults();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> School Results
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

export default SchoolResults;
