import React, { Component } from 'react';
import {
  CardHeader,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

class Dashboard extends Component {

  constructor() {
    super()
    var token = JSON.parse(localStorage.getItem('auth'));
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    };

    this.state = {
      data: {},
      subscription_value: {
        columns: [
          {
            label: 'Subject',
            field: 'subject',
          },
          {
            label: 'Amount',
            field: 'amount',
          },
        ],
        rows: []
      },
      cities: {
        columns: [
          {
            label: 'Cities',
            field: 'city',
          },
        ],
        rows: []
      }
    };

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/dashboard`,
      { headers: this.headers }
    )
      .then(response => {
        this.setState({ data: response.data.data });
        const { subscription_values, cities } = this.state.data;
        const subscription_value_row = subscription_values.map(subscription_value => {
          return {
            subject: subscription_value.subject,
            amount: subscription_value.amount
          }
        });
        this.setState({ subscription_value: { ...this.state.subscription_value, rows: subscription_value_row } });

        const cities_row = cities.map(city => {
          return {
            city: city.city
          }
        });
        this.setState({ cities: { ...this.state.cities, rows: cities_row } });
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="4" sm="4" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.data.subscribed_users}</div>
                <div>Total Active Subscribers</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="4" sm="4" lg="4">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.data.unSubscribed_users}</div>
                <div>Total Inactive Subscribers</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="4" sm="4" lg="4">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{this.state.data.teachers_count}</div>
                <div>Total Teachers</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Subscription Value
              </CardHeader>
              <CardBody>
                <MDBDataTable
                  striped
                  bordered
                  small={false}
                  data={this.state.subscription_value}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Cities
              </CardHeader>
              <CardBody>
                <MDBDataTable
                  striped
                  bordered
                  small={false}
                  data={this.state.cities}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
