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
  renderCard(bgc, fgc, textContent) {
    return (
  <View style={[styles.box, {backgroundColor: bgc}]}><Text style={[styles.boxText, {backgroundColor: fgc}]}>{textContent}</Text></View>
    );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 1')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 2')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 3')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 4')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 5')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 6')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 7')}
    {this.renderCard('#003366', '#446699', 'Text Box 2')}
    {this.renderCard('#330066', '#664499', 'Text Box 3')}
    {this.renderCard('#336600', '#669944', 'Text Box 4')}
    {this.renderCard('#660033', '#994466', 'Text Box 5')}
    {this.renderCard('#663300', '#996644', 'Text Box 6')}
    {this.renderCard('#006600', '#449944', 'Text Box 1')}
    {this.renderCard('#003366', '#446699', 'Text Box 2')}
    {this.renderCard('#330066', '#664499', 'Text Box 3')}
    {this.renderCard('#336600', '#669944', 'Text Box 4')}
    {this.renderCard('#660033', '#994466', 'Text Box 5')}
    {this.renderCard('#663300', '#996644', 'Text Box 6')}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    //backgroundColor: '#F5FCFF',
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
  box: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%',
    borderRadius: 10,
  },
  boxText: {
    height: 100,
    marginBottom: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#cccccc',
    color: '#eeeeee',
    textShadowColor: '#666666',
    fontSize: 25,
    padding: '2%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});