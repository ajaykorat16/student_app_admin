import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class User extends Component {

  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      user: {}
    };

  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?user_id=${this.props.match.params.id}`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ user: response.data.data })
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    const userDetails = this.state.user ? Object.entries(this.state.user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      userDetails.map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td>{`${key.replace("_", " ")}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
