const Customer = require("../model/CustomerModel");

const CreateCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    const token = await customer.generateAuthToken();
    customer.password = undefined;
    res.status(201).send({ customer, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const LoginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findByCredentials(email, password);
    const token = await customer.generateAuthToken();
    customer.password = undefined;
    res.send({ customer, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const DeleteCustomer = async (req, res) => {
  try {
    const { password } = req.body;
    const customer = req.customer;
    const email = customer.email;

    const c = await Customer.findByCredentials(email, password);
    if (c) {
      const _id = c._id;
      const result = await Customer.findOneAndDelete({ _id });
      result.password = undefined;
      res.status(200).send(result);
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { CreateCustomer, LoginCustomer, DeleteCustomer };
