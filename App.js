import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  renderWeather(bgc, fgc, textContent) {
    return (
  <View style={[styles.weatherBox, {backgroundColor: bgc}]}><Text style={[styles.weatherText, {backgroundColor: fgc}]}>{textContent}</Text></View>
    );
  }
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  getData() {
    return fetch('http://forecast.weather.gov/MapClick.php?lat=64.5394&lon=-165.4643&unit=0&lg=english&FcstType=json&TextType=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.location});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentWillMount(){
    this.getData()
  }
  render() {
    console.log(this.state.data)
    var mydata = this.state.data;
    return (
      <ScrollView style={styles.container}>
    {this.renderWeather('#eeeeee', '#eeeeee', mydata.areaDescription)}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 2')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 3')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 4')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 5')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 6')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 7')}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    overflow: 'hidden',
  },
  weatherBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  weatherText: {
    height: 100,
    color: '#666666',
    textShadowColor: '#666666',
    fontSize: 25,
    padding: '2%',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
});
