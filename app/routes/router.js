const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 3000;

router.get('/', (req, res) => {
  res.json({
    'All Clients': `http://localhost:${PORT}/api/clients`,
    'All Clients With visits': `http://localhost:${PORT}/api/clients/visits`,
    'Single Client': `http://localhost:${PORT}/api/clients/8`,
    'Single Detailed': `http://localhost:${PORT}/api/clients/8/visits`,
    'All providers': `http://localhost:${PORT}/api/providers`,
    'Single Provider': `http://localhost:${PORT}/api/providers/3`,
    //  'All Services': `http://localhost:${PORT}/api/services`,
    //  'All Insurances': `http://localhost:${PORT}/api/insurance`,
  });
});

router.use('/clients', require('./api/clientRoutes'));
router.use('/providers', require('./api/providerRoutes.js'));
router.use('/visits', require('./api/visitRoutes.js'));

// router.use('/provider', require('./api/providerRoutes'));
// router.use('/service', require('./api/serviceRoutes'));
// router.use('/insurance', require('./api/insuranceRoutes'));

module.exports = router;
