var React = require('react-native');
var api = require('../utils/api');

var ListItem = require('./ListItem');

var {
  ListView,
  ActivityIndicatorIOS,
  StyleSheet,
  View,
  Text,
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var Beers = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      dataSource: ds
    };
  },

  componentDidMount: function() {
    api.fetchBeers(this.props.location.slug).then((data) => {
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(data)
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
            renderRow={(name) => {
              return <ListItem text={name} />
            }}
            initialListSize={400}
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

module.exports = Beers;
