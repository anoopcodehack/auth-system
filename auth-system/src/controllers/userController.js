const User = require('../models/User');

// ─── Admin: Get All Users ─────────────────────────────────────────────────────
// GET /api/users   [Admin only]
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Admin: Delete Any User ───────────────────────────────────────────────────
// DELETE /api/users/:id   [Admin only]
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `User "${user.name}" deleted successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Student/Admin: Get Own Profile ──────────────────────────────────────────
// GET /api/users/me   [Authenticated]
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Student: Update Own Profile ─────────────────────────────────────────────
// PUT /api/users/me   [Authenticated]
const updateMyProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    // Prevent role/password changes through this route
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio },
      { new: true, runValidators: true }
    ).select('-__v');

    res.status(200).json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Admin: Get Any Student's Data ───────────────────────────────────────────
// GET /api/users/:id   [Admin only]
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, getMyProfile, updateMyProfile, getUserById };
