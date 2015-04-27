var React = require('react-native');
var _ = require('lodash');
var api = require('../utils/api');
var listViewStyles = require('../styles/listView');

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
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2
});

var Locations = React.createClass({
  watchId: null,
  position: {},

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
        this.position = position;
        this._fetchLocations();
      },
      (error) => console.error(error)
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.position = position;
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  _fetchLocations: function () {
    var coords = {
      latitude: this.position.coords.latitude,
      longitude: this.position.coords.longitude,
    };

    Promise.all([api.fetchStores(), api.fetchNearbyStores(coords)])
    .then((values) => {
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRowsAndSections({
          closest: [values[1]],
          all: values[0]
        })
      });
    });
  },

  _handleLocationSelect: function(location) {
    this.props.navigator.push({
      title: location.name,
      component: Beers,
      passProps: {location},
    });
  },

  _renderSectionHeader: function(data, section) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.replace('_', ' ').toUpperCase()}
        </Text>
      </View>
    );
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
            renderSectionHeader={this._renderSectionHeader}
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

var styles = StyleSheet.create(_.merge({}, listViewStyles, {
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}));


module.exports = Locations;
