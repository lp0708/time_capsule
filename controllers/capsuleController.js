const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const Capsule = require('../models/Capsule');

const getMediaType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return 'image';
};

const buildMediaUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/${filename}`;

const deleteFile = (filename) => {
  const filePath = path.join(__dirname, '../uploads', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// @desc    Get all capsules for current user
// @route   GET /api/capsules
// @access  Private
const getCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: capsules.length, capsules });
  } catch (error) {
    console.error('Get capsules error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch capsules.' });
  }
};

// @desc    Get single capsule
// @route   GET /api/capsules/:id
// @access  Private
const getCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findOne({ _id: req.params.id, user: req.user._id });
    if (!capsule) {
      return res.status(404).json({ success: false, message: 'Capsule not found.' });
    }
    res.json({ success: true, capsule });
  } catch (error) {
    console.error('Get capsule error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch capsule.' });
  }
};

// @desc    Create a new capsule
// @route   POST /api/capsules
// @access  Private
const createCapsule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) req.files.forEach(f => deleteFile(f.filename));
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, description, openDate, tags, color } = req.body;

  try {
    const media = (req.files || []).map((file) => ({
      url: buildMediaUrl(req, file.filename),
      type: getMediaType(file.mimetype),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    }));

    const parsedTags = tags
      ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean))
      : [];

    const capsule = await Capsule.create({
      user: req.user._id,
      title,
      description,
      media,
      openDate: openDate || null,
      tags: parsedTags,
      color: color || '#f9e4d4',
    });

    res.status(201).json({ success: true, capsule });
  } catch (error) {
    console.error('Create capsule error:', error);
    if (req.files) req.files.forEach(f => deleteFile(f.filename));
    res.status(500).json({ success: false, message: 'Failed to create capsule.' });
  }
};

// @desc    Update capsule
// @route   PUT /api/capsules/:id
// @access  Private
const updateCapsule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files) req.files.forEach(f => deleteFile(f.filename));
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let capsule = await Capsule.findOne({ _id: req.params.id, user: req.user._id });
    if (!capsule) {
      if (req.files) req.files.forEach(f => deleteFile(f.filename));
      return res.status(404).json({ success: false, message: 'Capsule not found.' });
    }

    const { title, description, openDate, tags, color, removeMediaIds } = req.body;

    // Remove specified existing media
    if (removeMediaIds) {
      const idsToRemove = Array.isArray(removeMediaIds) ? removeMediaIds : [removeMediaIds];
      capsule.media = capsule.media.filter((m) => {
        if (idsToRemove.includes(m._id.toString())) {
          deleteFile(m.filename);
          return false;
        }
        return true;
      });
    }

    // Append newly uploaded media
    if (req.files && req.files.length > 0) {
      const newMedia = req.files.map((file) => ({
        url: buildMediaUrl(req, file.filename),
        type: getMediaType(file.mimetype),
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      }));
      capsule.media = [...capsule.media, ...newMedia];
    }

    if (title !== undefined)       capsule.title = title;
    if (description !== undefined) capsule.description = description;
    if (openDate !== undefined)    capsule.openDate = openDate || null;
    if (color !== undefined)       capsule.color = color;
    if (tags !== undefined) {
      capsule.tags = Array.isArray(tags)
        ? tags
        : tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    await capsule.save();
    res.json({ success: true, capsule });
  } catch (error) {
    console.error('Update capsule error:', error);
    if (req.files) req.files.forEach(f => deleteFile(f.filename));
    res.status(500).json({ success: false, message: 'Failed to update capsule.' });
  }
};

// @desc    Delete capsule
// @route   DELETE /api/capsules/:id
// @access  Private
const deleteCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findOne({ _id: req.params.id, user: req.user._id });
    if (!capsule) {
      return res.status(404).json({ success: false, message: 'Capsule not found.' });
    }

    // Delete all associated media files from disk
    capsule.media.forEach((m) => deleteFile(m.filename));

    await capsule.deleteOne();
    res.json({ success: true, message: 'Capsule deleted successfully.' });
  } catch (error) {
    console.error('Delete capsule error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete capsule.' });
  }
};
module.exports = { getCapsules, getCapsule, createCapsule, updateCapsule, deleteCapsule };