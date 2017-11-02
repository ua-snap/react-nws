import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';

 // 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

  


//export default class App extends Component<{}> {
class WeatherScreen extends Component {
  static navigationOptions = {
    title: 'WeatherLocation',
  }
  render(){ 
    <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')} ><Text>WeatherLocation</Text></TouchableHighlight>
  }
}
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  renderWeather(bgc, fgc, textContent) {
    return (

  <TouchableHighlight onPress={  () => this.props.navigation.navigate('WeatherLocation') } style={[styles.weatherBox, {backgroundColor: bgc}]}><Text style={[styles.weatherText, {backgroundColor: fgc}]}>{textContent}</Text></TouchableHighlight>
    );
  }
  constructor(props) {
    super(props)
    this.state = { data1: [], data2: [], data3: [] }
  }
  getData1(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data1: responseJson.location});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getData2(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data2: responseJson.location});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getData3(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data3: responseJson.location});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentWillMount(){
    this.getData1('http://forecast.weather.gov/MapClick.php?lat=63.0337&lon=-163.5484&unit=0&lg=english&FcstType=json&TextType=1');
    this.getData2('http://forecast.weather.gov/MapClick.php?lat=63.0433&lon=-163.3699&unit=0&lg=english&FcstType=json&TextType=1');
    this.getData3('http://forecast.weather.gov/MapClick.php?lat=63.2311&lon=-162.8866&unit=0&lg=english&FcstType=json&TextType=1');
	//Kotlik: 63.0337N, 163.5484W
	//North Mouth-Kotlik: 63.0433N, 163.3699W
	//Southern Norton Sound-Reindeer Camp: 63.2311N, 162.8866W

  }
  render() {
    var mydata1 = this.state.data1;
    var mydata2 = this.state.data2;
    var mydata3 = this.state.data3;

    return (
      <ScrollView style={styles.container}>
    {this.renderWeather('#eeeeee', '#eeeeee', mydata1.areaDescription)}
    {this.renderWeather('#eeeeee', '#eeeeee', mydata2.areaDescription)}
    {this.renderWeather('#eeeeee', '#eeeeee', mydata3.areaDescription)}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 4')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 5')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 6')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 7')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 8')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 9')}
    {this.renderWeather('#eeeeee', '#eeeeee', 'Weather 10')}
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


const ModalStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  WeatherLocation: {
    screen: WeatherScreen,
  },
});

export default ModalStack;
