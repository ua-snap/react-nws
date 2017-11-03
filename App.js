import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Linking
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Moment from 'moment-es6';

class WeatherScreen extends Component {
  static navigationOptions = {
    title: 'Forecast',
  }
  constructor(props) {
    super(props)
    this.state = {
      weatherJson: undefined
    }
  }
  componentWillMount() {
    fetch(this.props.navigation.state.params.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          weatherJson: responseJson
        });
      })
      .catch((error) => {
        // TODO: put an error capture in here
      });
  }
  render() {
    // If the data hasn't been loaded yet, show a loading indicator.
    if (this.state.weatherJson === undefined) {
      return(
        <View style={[styles.loading]}>
          <Text style={[styles.loadingText]}>Loading&hellip;</Text>
        </View>
      )
    }

    // Otherwise, show the weather information!
    var forecast = this.state.weatherJson.time.startPeriodName.map((time, index) =>
      <View key={time} style={[styles.forecastBlock]}>
        <Text style={[styles.timeSpanHeader]}>
          {time}&nbsp;
          <Text style={[styles.temperature]}>
            {this.state.weatherJson.data.temperature[index]}&deg;F
          </Text>
        </Text>
        <View style={[styles.weatherDetailWrapper]}>
          <Text style={[styles.weatherDetail]}>
            {this.state.weatherJson.data.text[index]}
          </Text>
        </View>
      </View>
    )

    var time = Moment().format('MMM D, h:mm a');

    var hazardContent;
    if (this.state.weatherJson.data.hazard) {

      var hazards = this.state.weatherJson.data.hazard.map((hazard, index) =>
        <TouchableHighlight
          class={[styles.hazardItem]}
          key={hazard}
          onPress={
            () => Linking.openURL(this.state.weatherJson.data.hazardUrl[index].replace(/&amp;/g,'&')
            )
          }
        >
          <Text style={[styles.hazardItem]}>
            {hazard}
          </Text>
        </TouchableHighlight>
      );
      hazardContent = (
        <View class={[styles.hazardContent]}>{hazards}</View>
      );
    }

    return(
      <ScrollView style={[styles.forecastWrapper]}>
        <Text style={[styles.forecastHeader]}>Forecast for {this.props.navigation.state.params.name}</Text>
        <Text style={[styles.forecastTimestamp]}>{time}</Text>
        {hazardContent}
      	{forecast}
      </ScrollView>
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
          name: 'North Mouth - Kotlik',
          id: 2,
          url: 'http://forecast.weather.gov/MapClick.php?lat=63.0433&lon=-163.3699&unit=0&lg=english&FcstType=json&TextType=1'
        },
        {
          name: 'Southern Norton Sound - Reindeer Camp',
          id: 3,
          url: 'http://forecast.weather.gov/MapClick.php?lat=63.2311&lon=-162.8866&unit=0&lg=english&FcstType=json&TextType=1'
        },
        {
          name: 'Barrow - Land',
          id: 4,
          url: 'http://forecast.weather.gov/MapClick.php?lat=71.20&lon=-156.62&unit=0&lg=english&FcstType=json&TextType=1'
        },
        {
          name: 'Fairbanks - NE Gilmore Trail',
          id: 5,
          url: 'http://forecast.weather.gov/MapClick.php?lat=64.9119242766825&lon=-147.56619140624997&unit=0&lg=english&FcstType=json&TextType=1'
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
            'WeatherLocation', {
              url: place.url,
              name: place.name
            }
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
  forecastBlock: {
    padding: 15
  },
  forecastHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  forecastTimestamp: {
    margin: 10
  },
  hazardItem: {
    padding: 10,
    backgroundColor: '#ED2500',
    color: '#fff',
    fontWeight: 'bold'
  },
  hazardContent: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  timeSpanHeader: {
    fontSize: 24
  },
  temperature: {
    color: '#666',
    fontWeight: 'bold'
  },
  weatherDetail: {
    fontSize: 18
  },
  weatherDetailWrapper: {
    marginTop: 5
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 24,
    textAlign: 'center'
  },
  container: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    overflow: 'hidden',
  },
  weatherBox: {
    justifyContent: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  weatherText: {
    color: '#333',
    fontSize: 32,
    padding: 10,
    textAlign: 'left',
  }
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
