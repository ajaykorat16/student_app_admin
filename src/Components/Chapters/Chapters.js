import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button }
  from 'reactstrap';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';

class Chapters extends Component {
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
          label: 'Chapter Number',
          field: 'chapter_no',
        },
        {
          label: 'Chapter Name',
          field: 'chapter_name',
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

  changeStatus(chapter_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/chapter/change_status`,
      { chapter_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getChapters();

      }).catch(error => {
        console.log(error);
      })
  }

  deleteChapter(chapter_id) {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/chapter/delete`,
      { id: chapter_id },
      { headers: this.headers }
    )
      .then(response => {
        this.getChapters();

      }).catch(error => {
        console.log(error);
      })
  }

  getChapters() {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/chapters`,
      { headers: this.headers }
    )
      .then(response => {
        const rows = response.data.data.map(chapter => {
          return {
            standard: chapter.standard,
            subject: chapter.subject,
            chapter_no: chapter.chapter_no,
            chapter_name: chapter.chapter_name,
            is_active: <Link to={"#"} onClick={() => this.changeStatus(chapter.id)} ><Badge color={chapter.is_active === 1 ? 'success' : 'secondary'}>{chapter.is_active ? 'Active' : 'InActive'}</Badge></Link>,
            action: <React.Fragment><Link to={`/chapters/edit/${chapter.id}`}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></Link><span>  </span>
              <Link to={null} className="text-danger" onClick={() => { if (window.confirm('Are you sure you want to delete this chapter?')) { this.deleteChapter(chapter.id) }; }}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></Link></React.Fragment >
          }
        });
        this.setState({ rows })
      }).catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getChapters();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chapters
                <Link className="pull-right" to="/chapters/create"><Button color="primary"> Create</Button></Link>
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

export default Chapters;
