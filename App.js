/**
 * gorilla-weather-native
 * https://github.com/tadasho/gorilla-weather-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import {
  StackNavigator,
  TabNavigator,
  navigate,
  screen,
  none,
  MyOtherRoutes,
} from 'react-navigation';

var REQUEST_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=280010';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: "",
    };
  }
  static navigationOptions = {
    title: 'Welcome',
    header: () => ({
      visible: false,
    })
  };
  fetchData() {
    fetch(REQUEST_URL, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          site: responseData,
        });
      })
      .done();
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
					</Text>
      </View>
    );
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { navigate } = this.props.navigation;
    var site = this.state.site;
    const forecast = site.forecasts;
    if (!site) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigate('Setting')}
              title="Chat with Lucy"
            >
              <Icon name='ios-settings-outline' />
            </Button>
          </Left>
          <Body>
            <Title>{site.location.city}の天気</Title>
          </Body>
          <Right />
        </Header>

        <Content>

          <Card>
            <CardItem>
              <Body>
                <Text>{site.description.text}</Text>
              </Body>
            </CardItem>
          </Card>

          <View>
            {forecast.map((tenki) =>
              <Card key={tenki.date}>
                <CardItem bordered>
                  <Left>
                    <Image source={{ uri: tenki.image.url }}
                      style={{ width: tenki.image.width, height: tenki.image.height }} />
                    <Body>
                      <Text>{tenki.dateLabel}の天気</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem header>
                  <Text>{tenki.telop}</Text>
                </CardItem>
                <CardItem>
                  <Text>
                    最高気温: {tenki.temperature.max == null
                      ? "--"
                      : tenki.temperature.max.celsius}
                    {'\n'}
                    最低気温: {tenki.temperature.min == null
                      ? "--"
                      : tenki.temperature.min.celsius}</Text>
                </CardItem>
              </Card>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

class SettingScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };
  render() {
    return (
      <View>
        <Text>set up a twitter account</Text>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Setting: { screen: SettingScreen },
}, {
    headerMode: 'screen',
  });

export default SimpleApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
