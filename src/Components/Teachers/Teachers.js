import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Teachers extends Component {
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
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Phone',
          field: 'phone'
        },
        {
          label: 'Promocode',
          field: 'promocode',
        },
        {
          label: 'Age',
          field: 'age',
        },
        {
          label: 'Gender',
          field: 'gender',
        },
        {
          label: 'Qualification',
          field: 'qualification',
        },
        {
          label: 'Post',
          field: 'post',
        },
        {
          label: 'Address',
          field: 'address',
        },
        {
          label: 'Action',
          field: 'action'
        }

      ],
      rows: []
    };

  }

  deleteTeacher(teacher_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/teacher/delete`,
      { id: teacher_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getTeachers();

      }).catch(error => {
        console.log(error);
      })
  }

  getTeachers() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/teachers`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(teacher => {
          return {
            name: teacher.name,
            phone: teacher.phone,
            promocode: teacher.promocode,
            age: teacher.age,
            gender: teacher.gender,
            qualification: teacher.qualification,
            post: teacher.post,
            address: teacher.address,
            action: <React.Fragment><Link to={`/teachers/edit/${teacher.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this teacher?')) { this.deleteTeacher(teacher.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getTeachers();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Teachers
                <Link className="pull-right" to="/teachers/create"><Button color="primary"> Create</Button></Link>
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

export default Teachers;
