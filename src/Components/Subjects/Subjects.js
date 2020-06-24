import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Subjects extends Component {
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
          label: 'Price',
          field: 'price',
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

  changeStatus(subject_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/subject/change_status`,
      { subject_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getSubjects();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteSubject(subject_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/subject/delete`,
      { id: subject_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getSubjects();

      }).catch(error => {
        console.log(error);
      })
  }

  getSubjects() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/subjects`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(subject => {
          return {
            subject: subject.subject,
            standard: subject.standard,
            price: subject.price,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(subject.id)} ><Badge color={subject.is_active === 1 ? 'success' : 'secondary'}>{subject.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/subjects/edit/${subject.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this subject?')) { this.deleteSubject(subject.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Subjects
                <Link className="pull-right" to="/subjects/create"><Button color="primary"> Create</Button></Link>
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

export default Subjects;
