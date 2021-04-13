const express = require("express");
const app = express();
const mongoose = require("mongoose"); // use mongoose
const config = require("../config/dev");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");

const PORT = 2000;

// routes
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/admin/auth.js");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

//connect database
mongoose.connect(
    config.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log("Error in DB connection: " + err);
        } else {
            console.log("MongoDB Connection Succeeded.");
        }
    }
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    bodyParser.json({
        limit: "50mb",
    })
);
app.use(logger("dev"));
app.use(
    cors({
        exposedHeaders: "*",
    })
);
app.use("/public/", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "success",
    });
});

app.listen(PORT, () => {
    console.log("Server on running on PORT " + PORT);
});
