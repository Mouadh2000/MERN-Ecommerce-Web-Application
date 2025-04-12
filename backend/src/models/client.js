const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const clientSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true
    },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
});

clientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 13);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

clientSchema.methods.activate = function () {
  this.status = 'active';
  this.isVerified = true;
  this.verificationToken = '';
  return this.save();
};

clientSchema.methods.disable = function () {
  this.disabled = true;
  return this.save();
};

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;