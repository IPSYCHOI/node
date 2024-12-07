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
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			if (edit) {
				res.render("admin/edit_product", {
					title: "Edit product",
					path: "/admin/edit-product",
					e: edit,
					product: product,
				});
			} else {
				res.redirect("/");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};



const postAddProduct = (req, res, next) => {
	const price = req.body.price;
	const des = req.body.des;
	const imageUrl = req.body.imageUrl;
	const title = req.body.title;
	const product=new Product({
        title:title,
        price:price,
        description:des,
        imageUrl:imageUrl,
		userId:req.user
    })
	product.save()
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
    // Product.findById(prodId)
    // .then(product=>{
    //     product.title=title
    //     product.price=price
    //     product.description=des
    //     product.imageUrl=imageUrl
    //     product.save()
    //     .then(() => {
    //         res.redirect("/admin/products");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // })
    Product.findByIdAndUpdate(prodId,{
        title:title,
        price:price,
        description:des,
        imageUrl:imageUrl
    })
    .then(() => {
        res.redirect("/admin/products");
    })
    .catch((err) => {
        console.log(err);
    });
};
const getProducts = (req, res, next) => {
	Product.find()
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
	Product.findByIdAndDelete(prodId)
		
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
