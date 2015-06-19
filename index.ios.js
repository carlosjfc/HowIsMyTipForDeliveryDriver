/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Navigator,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;
var cssVar = require('cssVar');
var SearchPage = require('./SearchPage');

var HelloWorld = React.createClass ({
  render: function() {
    return (
        <Text style={styles.text}>Hello World!</Text>
      );
  },
});

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <View style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            {previousRoute.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(HelloWorld)}>
        <View style={styles.navBarRightButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Next
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

var HowIsMyTipForDeliveryDriver = React.createClass ({
  render: function() {
    return (
      <Navigator 
      debugOverlay={false}
      style={styles.appContainer}
      sceneStyle={styles.appContainer}
      initialRoute={{
        name: 'Welcome to your tip application',
        title: 'Welcome to your tip application', 
        index: 0
      }}
      configureScene={(route) => (
          Navigator.SceneConfigs.FloatFromLeft
          )
      }
      renderScene={(route, navigator) => (
        <ScrollView style={styles.scene} title={route.title}>
            <Text style={styles.messageText}>{route.content}</Text>
            <SearchPage />
          </ScrollView>
      )}
      navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar} />
        }  />
    );
  },
});

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

AppRegistry.registerComponent('HowIsMyTipForDeliveryDriver', () => HowIsMyTipForDeliveryDriver);