const Product = require("../models/product");
const Order = require("../models/order");
const product = require("../models/product");

const getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.render("shop/product_list", {
				prods: products,
				title: "shop",
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const getOneProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId).then((product) => {
		res.render("shop/product_detail", {
			product: product,
			title: product.title,
			path: "/product",
		});
	});
};
const getIndex = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				title: "shop",
				path: "/index",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const getOrders = (req, res, next) => {
	Order.find({"user.userId":req.user._id})
		.then((orders) => {
			res.render("shop/orders", {
				orders: orders,
				title: "orders",
				path: "/orders",
			});
		});
};
const getCart = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.then((user) => {
			res.render("shop/cart", {
				prods: user.cart.items,
				title: "cart",
				path: "/cart",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const postDeleteCartItme = (req, res, next) => {
	const prodId = req.body.prodId;

	req.user.removeFromCart(prodId)
	.then(() => {
		res.redirect("/cart");
	});
};
const postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
	.then(product=>{
		req.user.addToCart(product)
	})
	
	res.redirect("/");
};
const getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		title: "checkout",
		path: "/checkout",
	});
};
const postOrder = (req, res, next) => {
	req.user.populate("cart.items.productId").then(user=>{
		const products=user.cart.items.map(i=>{
			return {product:{...i.productId._doc},quantity:i.quantity}
		})
		const order= new Order({
			products:products,
			user:{
				name:user.name,
				userId:user._id
			}
		})
		return order.save()
		
	}).then(r=>{
		req.user.clearCart()
	})
	.then(() => {
		res.redirect("/orders");
	});
};

exports.getProducts = getProducts;
exports.getOneProduct = getOneProduct;
exports.getIndex = getIndex;
exports.getCart = getCart;
exports.postCart = postCart;
exports.postOrder = postOrder;
exports.getCheckout = getCheckout;
exports.getOrders = getOrders;
exports.postDeleteCartItme = postDeleteCartItme;
