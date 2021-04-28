const daoCommon = require('./common/daoCommon');

// API DAOS
const clientDao = { ...daoCommon, ...require('./api/clientDao') };
const providerDao = { ...daoCommon, ...require('./api/providerDao') };
const visitDao = { ...daoCommon, ...require('./api/visitDao') };

module.exports = {
  clientDao,
  providerDao,
  visitDao,
};
