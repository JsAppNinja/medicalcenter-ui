const bodyParser = require('body-parser');
const apiRoutes = require('../api/routes');

module.exports = (app) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.set('json spaces', 2); // can be removed, format json
  app.use('/api', apiRoutes);
};
