const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
}, {
  timestamps: true,
});

// Hash password BEFORE saving user to DB
// Hash password BEFORE saving user to DB
userSchema.pre('save', async function() {
  // Only hash if passwordHash was modified
  if (!this.isModified('passwordHash')) return;

  // Hash with salt rounds = 10
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Method to compare a candidate password with the stored hash
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);