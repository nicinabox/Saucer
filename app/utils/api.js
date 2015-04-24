var HOST = 'http://saucer-api.herokuapp.com';

var api = {
  fetchStores: function () {
    return fetch(`${HOST}/stores`)
      .then((resp) => resp.json());
  },

  fetchBeers: function (slug) {
    return fetch(`${HOST}/stores/${slug}/beers`)
      .then((resp) => resp.json());
  },

  fetchBeer: function (id) {
    return fetch(`${HOST}/beers/${id}`)
      .then((resp) => resp.json());
  }
};

module.exports = api;
