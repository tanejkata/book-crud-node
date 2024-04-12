const Order = require("../model/OrderModel");
const Book = require("../model/BookModel");

const CreateOrder = async (req, res) => {
  try {
    const customer = req.customer;
    const books = req.body;
    const bookList = [];
    let totalAmount = 0;

    for (const item of books) {
      const book = await Book.findById(item.item._id);
      if (!book || book.stockQuantity < item.quantity) {
        throw new Error("Book not found or out of stock");
      }
      totalAmount += book.price * item.quantity;
      bookList.push({ book: book._id, quantity: item.quantity });
    }
    const order = new Order({
      customer: customer._id,
      books: bookList,
      totalAmount,
    });

    for (const item of books) {
      const book = await Book.findById(item.item._id);
      book.stockQuantity = book.stockQuantity - item.quantity;
      await book.save();
    }
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("customer")
      .populate("books.book");
    res.status(201).send(populatedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const UpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, fields: { status: 1 } }
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

const GetOrder = async (req, res) => {
  try {
    const order = await Order.findById({
      customer: req.customer._id,
      _id: req.params.id,
    })
      .populate("customer")
      .populate("books.book");
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const ListOrder = async (req, res) => {
  try {
    let query = { customer: req.customer._id };
    if (req.customer?.role === "admin") {
      query = {};
    }
    const orders = await Order.find(query)
      .populate("customer")
      .populate("books.book");
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { CreateOrder, UpdateOrder, GetOrder, ListOrder };
