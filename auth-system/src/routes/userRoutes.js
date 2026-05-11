const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const {
  getAllUsers,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  getUserById,
} = require('../controllers/userController');

const router = express.Router();

// ─── All routes below require valid JWT ──────────────────────────────────────
router.use(protect);

// Student + Admin routes
router.get('/me', getMyProfile);
router.put('/me', updateMyProfile);

// Admin-only routes
router.get('/', restrictTo('admin'), getAllUsers);
router.get('/:id', restrictTo('admin'), getUserById);
router.delete('/:id', restrictTo('admin'), deleteUser);

module.exports = router;
