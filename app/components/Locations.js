var React = require('react-native');
var _ = require('lodash');
var api = require('../utils/api');

var Location = require('./Location');
var Beers = require('./Beers');

var {
  StyleSheet,
  ListView,
  ActivityIndicatorIOS,
  View,
  Text,
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var Locations = React.createClass({
  watchId: null,

  getInitialState: function() {
    return {
      isLoading: true,
      position: {},
      dataSource: ds
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._fetchLocations();
        this.setState({position});
      },
      (error) => console.error(error)
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });


  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  _fetchLocations: function () {
    api.fetchStores().then((locations) => {
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(locations)
      });
    }).done();
  },

  _handleLocationSelect: function(location) {
    this.props.navigator.push({
      title: location.name,
      component: Beers,
      passProps: {location},
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicatorIOS
            style={styles.centered}
            animating={this.state.isLoading} />
        ) : (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(loc) => {
              return <Location handleLocationSelect={() => this._handleLocationSelect(loc)} {...loc} />
            }}
            initialListSize={100}
          />
        )}
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});


module.exports = Locations;
