'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};

var SearchPage = React.createClass ({
	onSearchTextChanged: function(event) {
	  console.log('onSearchTextChanged');
	  this.setState({ searchString: event.nativeEvent.text });
	  console.log(this.state.searchString);
	},
	_handleResponse: function(response) {
	  this.setState({ isLoading: false , message: '' });
	  if (response.application_response_code.substr(0, 1) === '1') {
	    console.log('Properties found: ' + response.listings.length);
	    this.setState({ message: 'Properties found: ' + response.listings.length});
	  } else {
	    this.setState({ message: 'Location not recognized; please try again.'});
	  }
	},
	_executeQuery: function (query) {
	  console.log(query);
	  this.setState({ isLoading: true });
	  fetch(query) 
	  .then((response) => response.json()) 
	  .then((responseData) => this._handleResponse(responseData.response)) 
	  .catch(error => 
	     this.setState({
	      isLoading: false,
	      message: 'Something bad happened ' + error
	   }))
	  .done();
	},
	onSearchPressed: function(event) {
	  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
	  this._executeQuery(query);
	},
  getInitialState: function() { 
		return {  
			searchString: 'london',
			isLoading: false, 
			message: '',
		   }; 
		},
  render: function() {
  	var spinner = this.state.isLoading ?
  ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
  ( <View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for customers who tip!
        </Text>
        <Text style={styles.description}>
          Search by customer's name, customer's address, place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
  <TextInput
    style={styles.searchInput}
    onChange={this.onSearchTextChanged}
    placeholder='Search via name or postcode'
    value={this.state.searchString} />
  <TouchableHighlight style={styles.button}
      underlayColor='#99d9f4'
      onPress={this.onSearchPressed} >
    <Text style={styles.buttonText}>Go</Text>
  </TouchableHighlight>
</View>
<TouchableHighlight style={styles.button}
    underlayColor='#99d9f4'>
  <Text style={styles.buttonText}>Location</Text>
</TouchableHighlight>
<Image source={require('image!house')} style={styles.image}/>
{spinner}
<Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
},
image: {
  width: 217,
  height: 138
}
});

module.exports = SearchPage;