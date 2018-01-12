import React from "react";
import Expo from "expo";

import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      co: null,
      so: null,
      no: null,
      oz: null
    };
  }
  componentDidMount() {
    // il faut récupérer valeur du this dans une  variable (bind manuel) sinon elle sera perdue lors du fetch
    const ctx = this;

    // cle API OpenWeatheMap
    const weatherApiKey = "06aea259ff3cfc440c58bc8e256393c6";
    let city = "london";

    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        weatherApiKey
    )
      .then(function(response) {
        // Convert to JSON end return esponse
        return response.json();
      })
      .then(function(datasFromWeatherAPI) {
        // response is now called datasFromWeatherAPI
        console.log(
          datasFromWeatherAPI.name +
            ", lon : " +
            datasFromWeatherAPI.coord.lon +
            " lat : " +
            datasFromWeatherAPI.coord.lat
        );
        let lon = Math.round(datasFromWeatherAPI.coord.lon);
        let lat = Math.round(datasFromWeatherAPI.coord.lat);

        // on utilse la réponse pour faire nouveau fetch et recuperer infos co
        fetch(
          "http://api.openweathermap.org/pollution/v1/co/" +
            lat +
            "," +
            lon +
            "/current.json?appid=" +
            weatherApiKey
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(result) {
            //console.log(result.data[0].value);
            ctx.setState({
              co: result.data[0].value
            });
            // on met à jour le store avec la valeur retournée pour pouvoir la lire ailleurs
            ctx.props.sendDataCo(result.data[0].value);
          });

        // idem Sulfur Dioxide (so)
        fetch(
          "http://api.openweathermap.org/pollution/v1/so2/" +
            lat +
            "," +
            lon +
            "/current.json?appid=" +
            weatherApiKey
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(result) {
            //console.log(result.data[0].value);
            ctx.setState({
              so: result.data[0].value
            });
          });

        // idem Nitrogen Dioxide (no) , on utilise les valeurs moyennes de 201§ car current ne retourne rien
        fetch(
          "http://api.openweathermap.org/pollution/v1/no2/" +
            lat +
            "," +
            lon +
            "/current.json?appid=" +
            weatherApiKey
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(result) {
            console.log(result);
            if (result.message != undefined) {
              ctx.setState({
                no: result.message
              });
            } else {
              ctx.setState({
                no: result.data.no2.value
              });
            }
          });

        // idem OZONE on utilise les valeurs moyennes de 2017 car current ne retourne rien
        fetch(
          "http://api.openweathermap.org/pollution/v1/o3/" +
            lat +
            "," +
            lon +
            "/2017Z.json?appid=" +
            weatherApiKey
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(result) {
            //console.log(result);
            if (result.message != undefined) {
              ctx.setState({
                oz: result.message
              });
            } else {
              ctx.setState({
                oz: result.data
              });
            }
          });
      });
  }

  render() {
    return (
      <Card title="Paris Air pollution" image={require("./assets/paris.jpg")}>
        <Text>Carbon Monoxide (CO): {this.state.co}</Text>
        <Text>Sulfur Dioxide (SO2): {this.state.so}</Text>
        <Text>Nitrogen Dioxide (NO2): {this.state.no}</Text>
        <Text style={{ marginBottom: 10 }}>Ozone (O3): {this.state.oz}</Text>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // quand on utilise this.props.sendDataCo, on declenche dispatch
    sendDataCo: function(valueCoFromFetch) {
      dispatch({ type: "updateCo", valueCo: valueCoFromFetch });
    }
  };
}

const CityRedux = connect(null, mapDispatchToProps)(City);

export default CityRedux;
