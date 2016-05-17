import React, {Component} from 'react';
import _ from 'lodash';

class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  getWeatherIcon(forecast) {
    switch (forecast) {
      case "sunny":
      case "mostly-sunny":
        return (
          <div className="icon sun-shower">
            <div className="cloud"></div>
            <div className="sun">
              <div className="rays"></div>
            </div>
            <div className="rain"></div>
          </div>
        );
        break;
      case "scattered-thunderstorms":
      case "thunderstorms":
        return (
          <div className="icon thunder-storm">
            <div className="cloud"></div>
            <div className="lightning">
              <div className="bolt"></div>
              <div className="bolt"></div>
            </div>
          </div>
        );
        break;
      case "partly-cloudy":
      case "mostly-cloudy":
        return (
          <div className="icon cloudy">
            <div className="cloud"></div>
            <div className="cloud"></div>
          </div>
        );
        break;
      case "breezy":
        return (
          <div className="icon flurries">
            <div className="cloud"></div>
            <div className="snow">
              <div className="flake"></div>
              <div className="flake"></div>
            </div>
          </div>
        );
        break;
      case "sunny":
      case "mostly-sunny":
        return (
          <div className="icon sunny">
            <div className="sun">
              <div className="rays"></div>
            </div>
          </div>
        );
        break;
      case "scattered-showers":
        return (
          <div className="icon rainy">
            <div className="cloud"></div>
            <div className="rain"></div>
          </div>
        );
        break;
    }
  }

  render() {
    return (
      <div>
        <h4>10-Day Forecast</h4>
        <div className="forecasts">
          {this.props.forecast.map((forecast) => {
            return (<div className="forecast col-xs-4 col-md-3" key={forecast.date}>
              <div className="forecast-info">
                <div>{forecast.date} <span>{forecast.day}</span></div>
                <div>High : {forecast.high}</div>
                <div>Low : {forecast.low}</div>
                <div>{forecast.text}</div>
              </div>
              {this.getWeatherIcon(_.replace(_.lowerCase(forecast.text), ' ', '-'))}
            </div>);
          })}
        </div>
      </div>
    );
  }
}

export default Forecast;
