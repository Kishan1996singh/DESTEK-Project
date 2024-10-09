const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'your_jwt_secret';

// 1. Save Form Data
exports.saveFormData = async (req, res) => {
  const { name, mobile, referralCode, gender, technology, dob } = req.body;
  const profilePic = req.files.map((file) => file.path).join(','); // Save file paths as comma-separated string

  try {
    let points = 0;
    if (referralCode) {
      const referredUser = await User.findOne({ where: { referralCode } });
      if (referredUser) {
        points = 10;
        referredUser.points += 20; // Referral user gets 20 points
        await referredUser.save();
      }
    }

    const user = await User.create({ name, mobile, referralCode, gender, technology, profilePic, dob, points });
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// 2. Fetch Referral User List with Pagination
exports.getReferralUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { count, rows: referralUsers } = await User.findAndCountAll({
      where: { referralCode: req.user.referralCode },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.send({ referralUsers, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 3. Delete Referral User
exports.deleteReferralUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.send({ message: 'Referral user deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 4. Update Self Profile Information
exports.updateProfile = async (req, res) => {
  try {
    const { name, gender, technology, dob } = req.body;
    const user = await User.findByPk(req.user.id);
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (technology) user.technology = technology;
    if (dob) user.dob = dob;
    await user.save();
    res.send({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
