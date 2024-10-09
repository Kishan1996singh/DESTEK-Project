const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controller/userController');
const authenticateToken = require('../middleware/userMiddleware.js');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Define routes
router.post('/save', upload.array('profilePic'), userController.saveFormData);
router.get('/referralUsers', authenticateToken, userController.getReferralUsers);
router.delete('/referralUser/:id', authenticateToken, userController.deleteReferralUser);
router.put('/updateProfile', authenticateToken, userController.updateProfile);

module.exports = router;
