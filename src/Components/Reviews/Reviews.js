import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Reviews extends Component {
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
          label: 'User',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Ratings',
          field: 'ratings',
        },
        {
          label: 'Comment',
          field: 'comment',
        }
      ],
      rows: []
    };

  }

  getReviews() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(review => {
          return {
            name: review.name,
            ratings: review.ratings,
            comment: review.comment
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Reviews
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

export default Reviews;
