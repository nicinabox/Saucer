var param = require('jquery-param');
var HOST = 'http://saucer-api.herokuapp.com';

var _fetch = function (path) {
  return fetch(HOST + path).then((resp) => resp.json());
};

var api = {
  fetchNearbyStores: function (coords) {
    return _fetch(`/nearby?${param(coords)}`);
  },

  fetchStores: function () {
    return _fetch('/stores');
  },

  fetchBeers: function (slug) {
    return _fetch(`/stores/${slug}/beers`);
  },

  fetchBeer: function (id) {
    return _fetch(`/beers/${id}`);
  }
};

module.exports = api;
