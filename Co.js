import React from "react";
import Expo from "expo";

import { connect } from "react-redux";
import { Text, View } from "react-native";

class Co extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text>{this.props.valeurCO}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { valeurCO: state.valueCoFromcoReducer };
}

const CoRedux = connect(mapStateToProps, null)(Co);

export default CoRedux;