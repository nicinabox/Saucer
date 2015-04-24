var HOST = 'http://saucer-api.herokuapp.com';

var api = {
  fetchStores: function () {
    return fetch(`${HOST}/stores`).then((resp) => resp.json());
  }
};

module.exports = api;