const Product = require("../models/product");

const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
	Product.findAll()
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
	Product.findAll({ where: { id: prodId } }).then((product) => {
		res.render("shop/product_detail", {
			product: product[0],
			title: product[0].title,
			path: "/product",
		});
	});
};
const getIndex = (req, res, next) => {
	Product.findAll()
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
	req.user
		.getOrders({ include: [{ model: Product }] })
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
		.getCart()
		.then((cart) => {
			cart.getProducts().then((products) => {
				res.render("shop/cart", {
					prods: products,
					title: "cart",
					path: "/cart",
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const postCart = (req, res, next) => {
	let userCart;
	const prodId = req.body.productId;
	req.user.getCart().then((cart) => {
		userCart = cart;
		//get access to user's cart
		cart.getProducts({ where: { id: prodId } }).then(
			// search in cart item tabel for product with that prodid and that user's cart id
			([product]) => {
				if (!product) {
					//add new product to cart
					Product.findByPk(prodId).then((product) => {
						userCart.addProduct(product, {
							through: { quantity: 1 },
						});
					});
				} else {
					//increase the quantity
					let oldQty = product.cartItem.quantity;
					let newQty = +oldQty + 1;
					Product.findByPk(prodId).then((product) => {
						userCart.addProduct(product, {
							through: { quantity: newQty },
						});
					});
				}
			}
		);
	});
	res.redirect("/");
};
const getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		title: "checkout",
		path: "/checkout",
	});
};
const postOrder = (req, res, next) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts();
		})
		.then((products) => {
			return req.user.createOrder().then((order) => {
				order.addProducts(
					products.map((product) => {
						product.orderItem = {
							quantity: product.cartItem.quantity,
						};
						return product;
					})
				);
			});
		})
		.then(() => {
			req.user
				.getCart()
				.then((cart) => {
					return cart.getProducts();
				})
				.then((products) => {
					for (let product of products) {
						product.cartItem.destroy();
					}
				});
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
