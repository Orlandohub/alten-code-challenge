import React from "react";
import Select from "react-select";
import { Helmet } from "react-helmet";
import "./App.css";
import { Grid, Row, Col, Table } from "react-bootstrap";

const options = [
  { value: "kalles-grustransporter-ab", label: "Kalles Grustransporter AB" },
  { value: "johans-bulk-ab", label: "Johans Bulk AB" },
  { value: "haralds-värdetransporter-ab", label: "Haralds Värdetransporter AB" }
];

class App extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

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
            <Col xs={10}>
              <Select
                isMulti
                placeholder="Insert Client Names"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </Col>
            <Col xs={2}>
              <select className="form-control">
                <option>All</option>
                <option>Connected</option>
                <option>Not Connected</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>VIN</th>
                    <th>Reg. nr.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>YS2R4X20005399401</td>
                    <td>ABC123</td>
                    <td>Not Connected</td>
                  </tr>
                  <tr>
                    <td>VLUR4X20009093588</td>
                    <td>DEF456</td>
                    <td>Connected</td>
                  </tr>
                  <tr>
                    <td>VLUR4X20009048066</td>
                    <td>GHI789</td>
                    <td>Connected</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
