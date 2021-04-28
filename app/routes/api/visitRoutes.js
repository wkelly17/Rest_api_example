const express = require('express');
const router = express.Router();
const { visitDao: dao } = require('../../daos/dao');

// api/providers

router.get('/', (req, res) => {
  dao.allVisits(res, dao.table);
});

router.get('/:id', (req, res) => {
  dao.findPracById(res, dao.table, req.params.id);
});

module.exports = router;
