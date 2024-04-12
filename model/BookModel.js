const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  imageURL: {
    type: String,
  },
  genre: {
    type: String,
    default: "Other",
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Mystery",
      "Romance",
      "Horror",
      "Thriller",
      "Historical",
      "Biography",
      "Poetry",
      "Fantasy",
      "Adventure",
      "Self-Help",
      "Health",
      "Cooking",
      "History",
      "Science",
      "Art",
      "Business",
      "Travel",
      "Children",
      "Religion",
      "Philosophy",
      "Sports",
      "Music",
      "Comics",
      "Drama",
      "Education",
      "Technology",
      "Psychology",
      "Humor",
      "Other",
    ],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
