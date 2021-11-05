const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const tourRoute = require("./routes/tour");
const authUserRoute = require("./routes/authUser");
const authAdminRoute = require("./routes/authAdmin");
const bookingRoute = require("./routes/booking");
const reviewRoute = require("./routes/review");

const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_CONNECTION_URL;

mongoose.connect(connection_url, { useNewUrlParser: true }, () => {
	console.log("connected to DB!");
});

app.use(
	cors({
		origin: "*",
	})
);

app.use(express.json());
app.use("/api/tour", tourRoute);
app.use("/api/user", authUserRoute);
app.use("/api/admin", authAdminRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/review", reviewRoute);

app.get("/", (req, res) => {
	res.status(200).send("recipes API");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
