var React = require('react-native');
var _ = require('lodash');
var listViewStyles = require('../styles/listView');

var {
  StyleSheet,
  PixelRatio,
  View,
  Text
} = React;

var Location = React.createClass({

  render: function() {
    return (
      <View>
        <View style={styles.row}>
          <Text>{this.props.title}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

});

var styles = StyleSheet.create(_.merge({}, listViewStyles, {
}))

module.exports = Location;
