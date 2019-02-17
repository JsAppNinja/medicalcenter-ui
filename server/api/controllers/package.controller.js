const api = require('../src/package');

function getPackage(req, res) {
  const { name } = req.params;
  const promise = api.getPackage({ name });
  promise
    .then((v) => {
      res.json(v);
    })
    .catch(() => {
      res.status(404);
      res.send({});
    });
}

function getPackages(req, res) {
  const {
    cat,
    zip,
    joint,
    keyword,
    radius,
    limit,
    from,
  } = req.query;
  const promise = api.getPackagesSearch({
    cat,
    zip,
    joint,
    keyword,
    radius,
    limit,
    from,
  });
  promise
    .then((v) => {
      res.json(v);
    })
    .catch(() => {
      res.status(404);
      res.send({});
    });
}

module.exports = {
  getPackage,
  getPackages,
};
