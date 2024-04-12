const Customer = require("../model/CustomerModel");
const Book = require("../model/BookModel");

const admin = new Customer({
  name: "admin",
  email: "admin@example.com",
  password: "password",
  role: "admin",
});

async function InitializeData() {
  try {
    await admin.save();
    return true;
  } catch (error) {
    if (error && error.code === 11000) {
      return true;
    }
  }
}

module.exports = { InitializeData };
