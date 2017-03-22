/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
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
} from 'native-base';
import {
  StackNavigator,
  TabNavigator,
  navigate,
  screen,
  none,
  MyOtherRoutes,
} from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: () => ({
      visible: false,
    })
  };
  render() {
    const { navigate } = this.props.navigation;
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
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>
                  Hello!
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
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
