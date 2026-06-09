const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  url:          { type: String, required: true },
  type:         { type: String, enum: ['image', 'video'], required: true },
  filename:     { type: String, required: true },
  originalName: { type: String },
  size:         { type: Number },
});

const CapsuleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    media: {
      type: [MediaSchema],
      default: [],
    },
    openDate: {
      type: Date,
      default: null,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: '#f9e4d4',
    },
  },
  { timestamps: true }
);

// Virtual: is the capsule currently unlocked?
CapsuleSchema.virtual('isUnlocked').get(function () {
  if (!this.openDate) return true;
  return new Date() >= this.openDate;
});

CapsuleSchema.set('toJSON', { virtuals: true });
CapsuleSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Capsule', CapsuleSchema);