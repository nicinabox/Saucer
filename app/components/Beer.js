var React = require('react-native');
var api = require('../utils/api');

var {
  ListView,
  ActivityIndicatorIOS,
  StyleSheet,
  PixelRatio,
  View,
  Text,
} = React;

var Beer = React.createClass({
  getInitialState: function() {
    return {
      beer: {},
      isLoading: true
    };
  },

  componentDidMount: function() {
    api.fetchBeer(this.props.beer.id).then((data) => {
      this.setState({
        beer: data,
        isLoading: false,
      });
    }).done();
  },

  renderRow: function (label, value) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{label}</Text>
          <Text style={styles.rowValue}>{value}</Text>
        </View>
        <View style={styles.separator}></View>
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
          <View>
            {this.renderRow('Style', this.state.beer.style)}
            {this.renderRow('Brewer', this.state.beer.brewer)}
            {this.renderRow('City', this.state.beer.city)}
            {this.renderRow('Country', this.state.beer.country)}
            {this.renderRow('Container', this.state.beer.container)}

            <View style={styles.description}>
              <Text>
                {this.state.beer.description}
              </Text>
            </View>
          </View>
        )}

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
  },
  description: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  rowLabel: {
    color: '#666666',
  },
  rowValue: {
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#dddddd',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

module.exports = Beer;
