const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false,
  },
  role: {
    type: String,
    default: "customer",
  },
});

// Hashing password before saving
customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// generating token
customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = jwt.sign({ _id: customer._id.toString() }, process.env.SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// validating user
customerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return customer;
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
