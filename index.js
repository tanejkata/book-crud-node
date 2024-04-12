const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { AuthRoute } = require("./utils/Middleware");
const { InitializeData } = require("./utils/init");
dotenv.config();

const app = express();

// connect to db
try {
  mongoose.connect(process.env.MONGO_URL);
  console.log(`Connected to Database`);
  InitializeData();
} catch (err) {
  console.log(`error in connection DB ${err}`);
}

const corsOptions = {
  origin: "*", // Replace with your client's origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// basic middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/book", require("./routes/BookRouter"));
app.use("/api/v1/customer", require("./routes/CustomerRouter"));
app.use("/api/v1/order", require("./routes/OrderRouter"));

app.get("/api/v1/auth", AuthRoute);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
