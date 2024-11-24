const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const { getDashboardMetrics } = require('../../controllers/dashboard/dashboard.controller');

router.get('/dashboard', protect, authorize('admin'), getDashboardMetrics);

module.exports = router;
