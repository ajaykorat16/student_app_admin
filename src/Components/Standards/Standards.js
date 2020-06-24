import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Standards extends Component {
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

  changeStatus(standard_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/standard/change_status`,
      { standard_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getStandards();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteStandard(standard_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/standard/delete`,
      { id: standard_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getStandards();

      }).catch(error => {
        console.log(error);
      })
  }

  getStandards() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/standards`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(standard => {
          return {
            name: standard.name,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(standard.id)} ><Badge color={standard.is_active === 1 ? 'success' : 'secondary'}>{standard.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/standards/edit/${standard.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this standard?')) { this.deleteStandard(standard.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getStandards();
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Standards
                <Link className="pull-right" to="/standards/create"><Button color="primary"> Create</Button></Link>
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

export default Standards;
