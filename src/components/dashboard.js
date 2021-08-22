import React, { Component } from 'react'
import "./dashboard.css";
import WidgetText from './widgetText';
import WidgetBar from './wigetBar';
import WigdgetDoughnut from './WigdgetDoughnut';
import Dropdown from 'react-dropdown';
import WidgetLine from './widgetLine';
import 'react-dropdown/style.css';
import { Col,Row,Container } from 'react-bootstrap';

const config = {
  apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
  spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
  }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`

class dashboard extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      socialSource: null,
      referralSource: null,
      emailSource: null,
      users: null,
      newUsers: null,
      pageviews: null,
      sourceArr: [],
      userArr: [],
      bonusRate: [],
    }
  }

  getData = arg => {
    const arr = this.state.items;
    const arrl = arr.length;

    let OrganicSource = 0;
    let DirectSource = 0;
    let referralSource = 0;
    let socialSource = 0;
    let emailSource = 0 ;
    let users = 0;
    let newuser =0;
    let pageview = 0;
    let selectedValue = null;
    let sourceArr = [];
    let userArr = [];
    let bonusRate = [];


    for (let i = 0; i < arrl; i++) {
      if (arg == arr[i]["month"]) {
        OrganicSource = arr[i].organic_source;
        DirectSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        socialSource = arr[i].social_source;
        emailSource = arr[i].email_source;
        users = arr[i].users;
        newuser =arr[i].new_users;
        pageview = arr[i].page_views;
        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Social Source",
            value: arr[i].social_source
          },
          {
            label: "Email Source",
            value: arr[i].email_source
          },
        )
        userArr.push(
          {
            lable: "Users",
            value: arr[i].users
          },
          {
            lable: "New Users",
            value: arr[i].new_users
          },
        )
        bonusRate.push({
          lable: "BOUNCE RATE",
          value: arr[i].bounce_rate
        },)
      }
    }

    selectedValue = arg;
    this.setState({
      organicSource: OrganicSource,
      directSource: DirectSource,
      referralSource: referralSource,
      sourceArr: sourceArr,
      userArr: userArr,
      socialSource: socialSource,
      emailSource:emailSource,
      newUsers : newuser,
      users : users,
      pageview : pageview,
      bonusRate : bonusRate,
    })


  }


  updateDashboard = event => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value });
  };




  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => {

        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );

      });
  }





  render() {

    return (
      <div>
        <Container fluid>
                <Row className="header">
                  <Col>
                  <h1>DASHBOARD</h1>
                  </Col>
                  <Col>
                  <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                  </Col>
                </Row>
              </Container>
                <Container>
                <Row>
                  <Col>
                  <WidgetText title="ORGANIC SOURCE" value={this.state.organicSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="DIRECT SOURCE" value={this.state.directSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="REFERRAL SOURCE" value={this.state.referralSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="EMAIL SOURCE" value={this.state.emailSource}/>
                  </Col>
                  </Row>
                  <Row>
                  <Col>
                  <WidgetText title="SOCIAL SOURCE" value={this.state.socialSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="USER SOURCE" value={this.state.users}/>
                  </Col>
                  <Col>
                  <WidgetText title="NEWUSER SOURCE" value={this.state.newUsers}/>
                  </Col>
                  <Col>
                  <WidgetText title="PAGE VIEWS" value={this.state.pageview}/>
                  </Col>
                </Row>
                  <Col>
                  <WidgetBar title="SOURCE COMPARISON" data={this.state.sourceArr}/>
                  </Col>
                  <Col>
                  <WigdgetDoughnut title="USER COMPARISON" data={this.state.userArr}/>
                  </Col>
                  <Col>
                  <WidgetLine title="BOUNCE RATE" data={this.state.bonusRate}/>
                  </Col>
                
              </Container>
              
       
      </div>
    )
  }
}

export default dashboard
