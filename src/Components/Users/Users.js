import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Users extends Component {
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
          label: 'Standard',
          field: 'standard'
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'Phone',
          field: 'phone'
        },
        {
          label: 'Gender',
          field: 'gender'
        },
        {
          label: 'Type',
          field: 'type'
        },
        {
          label: 'City',
          field: 'city'
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

  changeStatus(user_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/change_status`,
      { user_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getUsers();

      }).catch(error => {
        console.log(error);
      })
  }

  getUsers() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(user => {
          return {
            name: user.name,
            standard: user.standard,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            type: user.type,
            city: user.city,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(user.id, user.is_active)} ><Badge color={user.is_active === 1 ? 'success' : 'secondary'}>{user.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <Link to={`/users/${user.id}`}><i className="fa fa-info fa-2x" aria-hidden="true"></i></Link>
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
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

export default Users;
