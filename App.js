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

  


class WeatherScreen extends Component {
  static navigationOptions = {
    title: 'WeatherLocation',
  }
  constructor(props) {
    super(props)
    this.state = {
      dataloaded: false,
      weatherJson: {}
    }
  }
  componentWillMount() {
    fetch(this.props.navigation.state.params.url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJSON is', responseJson)
        this.setState({
          weatherJson: responseJson
        });
      })
      .catch((error) => {
        this.setState(
          {
            weatherJson: {
              message: 'Sorry, an error occurred and weather data could not be loaded.'
            }
          }
        )
      });
  }
  render() {
    console.log(this.state.weatherJson)
    return(
      <View>
      	<Text>What</Text>
      </View>
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  constructor(props) {
    super(props)
    this.state = {
      locations: [
        {
          name: 'Kotlik',
          id: 1,
          url: 'http://forecast.weather.gov/MapClick.php?lat=63.0337&lon=-163.5484&unit=0&lg=english&FcstType=json&TextType=1'
        },
        {
          name: 'North Mouth-Kotlik',
          id: 2,
          url: 'http://forecast.weather.gov/MapClick.php?lat=63.0433&lon=-163.3699&unit=0&lg=english&FcstType=json&TextType=1'
        },
        {
          name: 'Southern Norton Sound-Reindeer Camp',
          id: 3,
          url: 'http://forecast.weather.gov/MapClick.php?lat=63.2311&lon=-162.8866&unit=0&lg=english&FcstType=json&TextType=1'
        }
      ]
    }
  }
  render() {
    // Generate a list of places, with appropriate
    // click actions mapped.
    var placeViews = this.state.locations.map((place) =>
      <TouchableHighlight key={place.id}
        style={[styles.weatherBox]}
        onPress={
          () => this.props.navigation.navigate(
            'WeatherLocation', { url: place.url }
          )
        }
      >
        <Text style={[styles.weatherText]}>
          {place.name}
        </Text>
      </TouchableHighlight>
    )

    return (
      <ScrollView style={styles.container}>
        {placeViews}
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
