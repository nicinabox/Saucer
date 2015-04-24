var React = require('react-native');
var _ = require('lodash');
var api = require('../utils/api');

var Location = require('./Location');

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
  getInitialState: function() {
    return {
      isLoading: true,
      dataSource: ds
    };
  },

  componentDidMount: function() {
    api.fetchStores().then((data) => {
      var locations = _.map(data, (v, k) => {
        return { slug: k, title: v };
      });

      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(locations)
      });
    }).done();
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
            renderRow={(loc) => <Location {...loc} />}
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
