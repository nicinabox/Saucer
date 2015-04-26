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

var groupBeers = function (beers) {
  return _.groupBy(beers, function(beer) {
    var character = beer.name.substr(0, 1);
    if (_.isNumber(+character) && !_.isNaN(+character)) {
      return '#';
    } else {
      return character;
    }
  });
};

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2
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
        dataSource: ds.cloneWithRowsAndSections(groupBeers(beers))
      });
    }).done();
  },

  _handleSearch: function (text) {
    var regex = new RegExp(text, 'i');
    var filter = (row) => regex.test(row.name);

    this.setState({
      dataSource: ds.cloneWithRowsAndSections(groupBeers(this.state.beers.filter(filter)))
    });
  },

  _handleBeerSelect: function(beer) {
    this.props.navigator.push({
      title: beer.name,
      component: Beer,
      passProps: {beer},
    });
  },

   _renderSectionHeader: function(data, section) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section.toUpperCase()}
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
              renderSectionHeader={this._renderSectionHeader}
              renderRow={(beer, i) => {
                return <ListItem key={i} onPress={() => this._handleBeerSelect(beer)} text={beer.name} />
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
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 13,
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
