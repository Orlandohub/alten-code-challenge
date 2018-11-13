import React from "react";
import _ from 'lodash';
import { Helmet } from "react-helmet";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import { getVehicles } from './api/vehicles';
import CustomerSearchBar from './components/CustomerSearchBar';
import StatusFilter from './components/StatusFilter';
import VehiclesTable from './components/VehiclesTable';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      customersList: null,
      options: [],
      vehicles: [],
      status: '',
    };

    this.handleCustomer = this.handleCustomer.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  updateResults() {
    const { status, customersList } = this.state;
    let queryString = '?';
    
    // GET CUSTOMERS LIST AND FORMAT RESULTS TO BE READY FOR QUERYSTRING
    const customers = _.map(customersList, (option, index) => {
      if (customersList.length === index + 1) {
        return `customerSlug=${option.value}`
      }
      return `customerSlug=${option.value}&`
    })

    if (!_.isEmpty(customers)) {
      queryString = `${queryString}${_.replace(_.toString(customers), ',', '')}`
    }

    if (!_.isEmpty(status)) {
      queryString = `${queryString}&status=${status}`
    }
    
    getVehicles(_.replace(queryString, ',', ''))
      .then(vehicles => {
        this.setState({
          vehicles
        });
      });
  }

  handleCustomer(customersList) {
    this.setState({ customersList }, () => this.updateResults());
  };

  handleStatus(event) {
    const status = event.target.value
    this.setState({ status }, () => this.updateResults());
  };

  componentDidMount() {
    getVehicles()
      .then(vehicles => {
        this.setState({
          vehicles,
          options: _.map(_.uniqBy(vehicles, 'customerSlug'), vehicle => {
            return {
              value: vehicle.customerSlug,
              label: vehicle.custumerName,
            }
          })
        });
      });
  }

  render() {
    const { customersList, options, vehicles, status } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Alten Code Challenge</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
            integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
            crossorigin="anonymous"
          />
        </Helmet>
        <Grid>
          <Row>
            <Col xs={12}><h1 className="title">Alten Code Challenge</h1></Col>
          </Row>
          <Row>
            <Col xs={12} md={10}>
              <CustomerSearchBar
                handleCustomer={this.handleCustomer}
                customersList={customersList}
                options={options}
              />
            </Col>
            <Col xs={12} md={2}>
              <StatusFilter
                handleStatus={this.handleStatus}
                status={status}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <VehiclesTable vehicles={vehicles} />
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
