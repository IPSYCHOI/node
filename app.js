const express = require("express");

const bodyparser = require("body-parser");

const path = require("path");

const adminData = require("./routes/admin");

const shopRouters = require("./routes/shop");

const errorController = require("./controllers/error");

const mongoose=require("mongoose")

const User =require("./models/user")

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("6753c81915451702af6d9fc4")
	.then(user=>{
		req.user=user
		next()
	})
	.catch(err=>{
		console.log(err)
	})
});

app.use("/admin", adminData.routes);

app.use(shopRouters);

app.use(errorController.get404);

const port = 80;
const host = "sus";



mongoose.connect("mongodb+srv://psychofesko:rwO5WozO5tjva18W@cluster0.aevcl.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0")
.then(r=>{
	
	app.listen(port, host, () => {
	
		console.log(
			`Server running at http://${host}:${port}`
		);
		
	});

})
.catch(err=>{
	console.log(err)
})