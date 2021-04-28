const express = require('express');
const router = express.Router();
const { clientDao: dao } = require('../../daos/dao');

// api/clients

router.get('/', (req, res) => {
  dao.findAll(res, dao.table);
});
router.get('/visits', (req, res) => {
  dao.patientVisits(res, dao.table);
});
router.get('/:id', (req, res) => {
  dao.findById(res, dao.table, req.params.id);
});
router.get('/:id/visits', (req, res) => {
  dao.singlePatientVisit(res, dao.table, req.params.id);
});

router.post('/create', (req, res) => {
  dao.create(req, res);
});

module.exports = router;
