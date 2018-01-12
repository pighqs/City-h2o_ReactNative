import React from "react";
import Expo from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

import { Text, View, Image, ImageBackground } from "react-native";

import { TabNavigator } from "react-navigation";
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import { reduxForm, Field } from "redux-form";

import CityRedux from "./City";
import CoRedux from "./Co";
import Home from "./Home";
import CameraExample from "./Camera";
import AccelerometerSensor from "./Accelerometer";




///// REDUCER 
function coReducer(state, action) {
  if(action.type = "updateCo") {
    return {valueCoFromcoReducer :action.valueCo };
  } else {
    return state;
  }
}


//// STORE
const store = createStore(coReducer);

////// ROUTES TABNAVIGATOR 
const RootTabs = TabNavigator({

  ////// routes ////

  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? "ios-home" : "ios-home-outline"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },

  City: {
    screen: CityRedux,
    navigationOptions: {
      tabBarLabel: "City",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? "ios-leaf" : "ios-leaf-outline"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },

  Co: {
    screen: CoRedux,
    navigationOptions: {
      tabBarLabel: "Co",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? "ios-information-circle" : "ios-information-circle-outline"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },

  Camera: {
    screen: CameraExample,
    navigationOptions: {
      tabBarLabel: "Camera",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? "ios-camera" : "ios-camera-outline"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },

  Accelerometer: {
    screen: AccelerometerSensor,
    navigationOptions: {
      tabBarLabel: "Speed",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? "ios-speedometer" : "ios-speedometer-outline"}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }

});


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RootTabs />
      </Provider>
    )
  }
}


export default App;
