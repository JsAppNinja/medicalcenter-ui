const api = require('../src/quicksearch');

function getQuickSearch(req, res) {
  const {
    keyword,
  } = req.query;
  api.getQuickSearch(keyword)
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      res.status(404);
      res.send({ message: e.message });
    });
}

module.exports = {
  getQuickSearch,
};
