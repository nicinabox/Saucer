var React = require('react-native');
var _ = require('lodash');

var api = require('../utils/api');

var ListItem = require('./ListItem');
var Beer = require('./Beer');

var {
  ListView,
  ActivityIndicatorIOS,
  StyleSheet,
  TextInput,
  View,
  Text,
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var Beers = React.createClass({
  getInitialState: function() {
    return {
      beers: [],
      isLoading: true,
      dataSource: ds
    };
  },

  componentDidMount: function() {
    api.fetchBeers(this.props.location.slug).then((beers) => {
      this.setState({
        beers: beers,
        isLoading: false,
        dataSource: ds.cloneWithRows(beers)
      });
    }).done();
  },

  _handleSearch: function (text) {
    var regex = new RegExp(text, 'i');
    var filter = (row) => regex.test(row.name);

    this.setState({
      dataSource: ds.cloneWithRows(this.state.beers.filter(filter))
    });
  },

  _handleBeerSelect: function(beer) {
    this.props.navigator.push({
      title: beer.name,
      component: Beer,
      passProps: {beer},
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
          <View style={styles.container}>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchTextInput}
                onChangeText={this._handleSearch}
                placeholder="Search..."
                clearButtonMode="always" />
            </View>

            <ListView
              dataSource={this.state.dataSource}
              automaticallyAdjustContentInsets={false}
              renderRow={(beer) => {
                return <ListItem onPress={() => this._handleBeerSelect(beer)} text={beer.name} />
              }}
              initialListSize={50}
            />
          </View>
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
  searchRow: {
    backgroundColor: '#f7f7f7',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    paddingLeft: 8,
  },
});

module.exports = Beers;
