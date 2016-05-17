import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import xml2js from 'xml2js';

import DataSet from './data-set';
import Forecast from './forecast';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      location: [],
      astronomy: [],
      atmosphere: [],
      wind: [],
      forecast: [],
      statesOption: <option></option>
    };

    this.getArray = this.getArray.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.addressRequest = $.ajax({
      url: "http://where.yahooapis.com/v1/states/US?appid=dj0yJmk9NjU5ZHE3ZldOc1hsJmQ9WVdrOWNXdzNTekpZTjJFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNA--",
      type: "GET",
      dataType: "text",
      success: (response) => {
        var parser = new xml2js.Parser({trim: true, async: true});
        parser.parseString(response, (error, result) => {
          var options = result.places.place.map((place) => {
            return <option key={place.woeid} value={place.woeid}>{place.name}</option>;
          });

          this.setState({statesOption: options});
        });
      }
    });

    this.getData(2347575);
  }

  getArray(object) {
    var array = [];
    _.forEach(object, (value, key) => {
      array.push({"label": _.upperFirst(key), "value": value});
    });

    return array;
  }

  getData(woeid) {
    this.request = $.ajax({
      url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20${woeid}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
      type: "GET",
      success: (response) => {
        this.setState({weather: response.query.results});
        this.setState({location: this.getArray(response.query.results.channel.location)});
        this.setState({astronomy: this.getArray(response.query.results.channel.astronomy)});
        this.setState({atmosphere: this.getArray(response.query.results.channel.atmosphere)});
        this.setState({wind: this.getArray(response.query.results.channel.wind)});
        this.setState({forecast: response.query.results.channel.item.forecast});
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  render() {
    if (!this.state.weather.channel) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <div className="header">
          <h4>Yahoo! Weather</h4>
        </div>
        <div className="selection">
          <label>Select State :</label>
          <select
            className="form-control"
            onChange={event => {
          this.getData(event.target.value);
        }}>
            {this.state.statesOption}
          </select>
        </div>
        <div className="data-group">
          <DataSet setName="Location" entries={this.state.location}/>
          <DataSet setName="Astronomy" entries={this.state.astronomy}/>
        </div>
        <div className="data-group">
          <DataSet setName="Atmosphere" entries={this.state.atmosphere}/>
          <DataSet setName="Wind" entries={this.state.wind}/>
        </div>
        <Forecast forecast={this.state.forecast}/>
        <a className="pull-xs-right" href="https://www.yahoo.com/?ilc=401" target="_blank">
          <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29"/>
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
