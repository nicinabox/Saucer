var React = require('react-native');
var _ = require('lodash');
var listViewStyles = require('../styles/listView');

var {
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  View,
  Text,
} = React;

var Location = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.handleLocationSelect}>
          <View style={styles.row}>
            <Text>{this.props.name}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }

});

var styles = StyleSheet.create(_.merge({}, listViewStyles, {
}))

module.exports = Location;
