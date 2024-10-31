const path = require("path");
const fs = require("fs");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");
const db = require("../util/database");
const Cart = require("../models/cart");
const getProductFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err || fileContent.length === 0) {
			return cb([]);
		}
		cb(JSON.parse(fileContent));
	});
};
module.exports = class product {
	title;
	price;
	dis;
	id;
	constructor(id, title, price, des, imageUrl) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.des = des;
		this.imageUrl = imageUrl;
	}
	static findById(id) {
		return db.execute(
			"SELECT * FROM products WHERE products.id=?",
			[id]
		);
	}
	save() {
		return db.execute(
			"INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",
			[this.title, this.price, this.des, this.imageUrl]
		);
	}
	static delete(id, pp) {
		getProductFromFile((products) => {
			const qty = 1;
			const deletedProductIndesx = products.findIndex(
				(p) => p.id === id
			);
			const deletedProduct = products.find((p) => p.id === id);
			products.splice(deletedProductIndesx, 1);
			Cart.delete(id, deletedProduct.price, qty, pp);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll() {
		return db.execute("SELECT * FROM products");
	}
};
