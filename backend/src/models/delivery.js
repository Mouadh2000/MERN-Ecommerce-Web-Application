const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
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
    unique: true,
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
  vehicleType: {
    type: String,
    enum: ['Bike', 'Car', 'Van', 'Truck'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

deliverySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const hashedPassword = await bcrypt.hash(this.password, 13);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
