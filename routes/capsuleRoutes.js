const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getCapsules,
  getCapsule,
  createCapsule,
  updateCapsule,
  deleteCapsule,
} = require('../controllers/capsuleController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const capsuleValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be 2–100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Description is required (max 5000 chars)'),
  body('openDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Open date must be a valid date'),
];

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getCapsules)
  .post(upload.array('media', 5), capsuleValidation, createCapsule);

router.route('/:id')
  .get(getCapsule)
  .put(upload.array('media', 5), capsuleValidation, updateCapsule)
  .delete(deleteCapsule);

module.exports = router;