var React = require('react-native');

var {
  PixelRatio,
} = React;

module.exports = {
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
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
};
