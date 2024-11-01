const { where } = require("sequelize");
const cart = require("../models/cart");
const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
	res.render("admin/edit_product", {
		title: "Add product",
		path: "/admin/add-product",
		e: false,
	});
};
const getEditProduct = (req, res, next) => {
	const edit = req.query.edit;
	prodId = req.params.productId;
	req.user
		.getProducts({ where: { id: prodId } })
		.then((products) => {
			if (edit) {
				res.render("admin/edit_product", {
					title: "Edit product",
					path: "/admin/edit-product",
					e: edit,
					product: products[0],
				});
			} else {
				res.redirect("/");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
const postDeleteItme = (req, res, next) => {
	const prodId = req.body.prodId;

	req.user.getCart().then((cart) => {
		cart.getProducts({ where: { id: prodId } })
			.then(([product]) => {
				product.cartItem.destroy();
			})
			.then(() => {
				res.redirect("/cart");
			});
	});
};

const postAddProduct = (req, res, next) => {
	const price = req.body.price;
	const des = req.body.des;
	const imageUrl = req.body.imageUrl;
	const title = req.body.title;
	req.user
		.createProduct({
			title: title,
			price: price,
			imageUrl: imageUrl,
			description: des,
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};
const postEditProduct = (req, res, next) => {
	const prodId = req.body.id;
	const price = req.body.price;
	const des = req.body.des;
	const imageUrl = req.body.imageUrl;
	const title = req.body.title;
	Product.findOne({ where: { id: prodId } })
		.then((product) => {
			product.title = title;
			product.description = des;
			product.imageUrl = imageUrl;
			product.price = price;
			return product.save();
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};
const getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				title: "All Products",
				path: "/admin/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
const postDeleteProduct = (req, res, next) => {
	const prodId = req.body.prodId;
	const pp = req.query.pp;
	Product.findByPk(prodId)
		.then((product) => {
			product.destroy();
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.postEditProduct = postEditProduct;
exports.getProducts = getProducts;
exports.getEditProduct = getEditProduct;
exports.postDeleteProduct = postDeleteProduct;
exports.postDeleteItme = postDeleteItme;
