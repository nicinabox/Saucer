var React = require('react-native');

var {
  View,
  Text,
} = React;

var Beers = React.createClass({

  render: function() {
    return (
      <View>
        <Text>Beers for {this.props.location.title}</Text>
      </View>
    );
  }

});

module.exports = Beers;
