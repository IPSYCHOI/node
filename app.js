const express = require("express");

const bodyparser = require("body-parser");

const path = require("path");

const adminData = require("./routes/admin");

const shopRouters = require("./routes/shop");

const errorController = require("./controllers/error");

const Product = require("./models/product");

const User = require("./models/user");

const Cart = require("./models/cart");

const Order = require("./models/order");

const OrderItem = require("./models/order-item");

const CartItem = require("./models/cart-item");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findByPk(1).then((user) => {
		req.user = user;
		next();
	});
});

app.use("/admin", adminData.routes);

app.use(shopRouters);

app.use(errorController.get404);

const port = 80;
const host = "0.0.0.0";

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.hasOne(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
	// .sync({ force: true })
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			User.create({ name: "ahmed", email: "ahmed@a.com" });
		}
		return user;
	})
	.then((user) => {
		// console.log(user);
		user.getCart()
			.then((cart) => {
				if (!cart) {
					return user.createCart().then(() => {});
				}
			})
			.then(() => {
				app.listen(port, host, () => {
					console.log(
						`Server running at http://${host}:${port}`
					);
				});
			});
	})
	.catch((err) => {
		console.log(err);
	});
