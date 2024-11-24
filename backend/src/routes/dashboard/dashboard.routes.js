const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const { getDashboardData } = require('../../controllers/dashboard/dashboard.controller');

// Protect all dashboard routes
router.use(protect);
router.use(authorize('admin'));

// Get dashboard data
router.get('/dashboard', getDashboardData);

module.exports = router;