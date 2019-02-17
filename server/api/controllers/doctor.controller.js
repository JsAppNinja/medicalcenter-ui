const api = require('../src/doctor');

function getDoctor(req, res) {
  const { uuid } = req.params;
  Promise.all([
    api.getDoctor({ uuid }),
    api.isClaimed(uuid),
  ]).then((result) => ({
    ...result[0],
    claimed: result[1],
  })).then((result) => {
    res.json(result);
  }).catch((e) => {
    res.status(404).send({
      message: e && e.message,
    });
  });
}

function getDoctorPost(req, res) {
  const { uuid } = req.body;
  const promise = api.getDoctor({ uuid });
  promise
    .then((v) => {
      res.json(v);
    })
    .catch(() => {
      res.status(404);
      res.send({ result: false });
    });
}

function getDoctors(req, res) {
  const {
    q,
    zip,
    joint,
    radius,
    from,
    limit,
    show_on_home: showOnHome,
  } = req.query;
  const promise = api.getDoctorsSearch({
    q,
    zip,
    joint,
    radius,
    from,
    limit,
    showOnHome,
  });
  promise
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      console.error(e); // eslint-disable-line
      res.status(404);
      res.send({});
    });
}

function getDoctorsPost(req, res) {
  const {
    zip,
    joint,
    radius,
    from,
    limit,
  } = req.body;
  const promise = api.getDoctorsSearch({
    zip,
    joint,
    radius,
    from,
    limit,
  });
  promise
    .then((v) => {
      res.send(v);
    })
    .catch((e) => {
      console.error(e); // eslint-disable-line
      res.status(404);
      res.send({ result: false });
    });
}

function getPreferredDoctors(req, res) {
  const {
    zip,
    joint,
    radius,
    from,
    limit,
    show_on_home: showOnHome,
  } = req.query;
  const promise = api.getPreferredDoctorsSearch({
    zip,
    joint,
    radius,
    from,
    limit,
    showOnHome,
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

function getDoctorsSearchByKeyword(req, res) {
  const {
    keyword,
    from,
    limit,
  } = req.query;
  const promise = api.getDoctorsSearchByKeyword({
    keyword,
    from,
    limit,
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

function getAutoComplete(req, res) {
  const promise = api.getAutoComplete();
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
  getDoctor,
  getDoctorPost,
  getDoctors,
  getDoctorsPost,
  getPreferredDoctors,
  getDoctorsSearchByKeyword,
  getAutoComplete,
};
