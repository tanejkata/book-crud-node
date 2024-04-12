const Book = require("../model/BookModel");

const CreateBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const book = await Book.findByIdAndUpdate(id, req.body.book, { new: true });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

const GetBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

const ListBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send({ message: "Book deleted successfully", book });
  } catch (error) {
    res.status(500).send(error);
  }
};

const SearchBook = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query = {
        $or: [{ title: regex }, { author: regex }, { genre: regex }],
      };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  CreateBook,
  UpdateBook,
  GetBook,
  ListBook,
  DeleteBook,
  SearchBook,
};
