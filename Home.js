import React from "react";
import Expo from "expo";
import { Button } from "react-native-elements";

import { View, Image, ImageBackground } from "react-native";

import { connect } from "react-redux";



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/mountains.jpg")}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Button
            raised
            //icon={{name: 'room', size: 32}}
            buttonStyle={{ backgroundColor: "#3498db" }}
            textStyle={{ textAlign: "center" }}
            title={`Info City`}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Home;