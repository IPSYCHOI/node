const express = require("express");

const bodyparser = require("body-parser");

const path = require("path");

const adminData = require("./routes/admin");

const shopRouters = require("./routes/shop");

const errorController = require("./controllers/error");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRouters);

app.use(errorController.get404);

const port = 80;
const host = "sus";

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});
