import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Faqs extends Component {
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
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Question',
          field: 'question',
        },
        {
          label: 'Answer',
          field: 'answer',
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

  changeStatus(faq_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/faq/change_status`,
      { faq_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getFaqs();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteFaq(faq_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/faq/delete`,
      { id: faq_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getFaqs();

      }).catch(error => {
        console.log(error);
      })
  }

  getFaqs() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/faqs`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(faq => {
          return {
            standard: faq.standard,
            subject: faq.subject,
            chapter: faq.chapter,
            type: faq.type,
            question: faq.question,
            answer: faq.answer,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(faq.id)} ><Badge color={faq.is_active === 1 ? 'success' : 'secondary'}>{faq.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/faqs/edit/${faq.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this faq?')) { this.deleteFaq(faq.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getFaqs();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chapters
                <Link className="pull-right" to="/faqs/create"><Button color="primary"> Create</Button></Link>
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

export default Faqs;
