const express = require("express")

const adminController=require("../controllers/admin")

const router = express.Router();



router.get("/add-product",adminController.getAddProduct)

router.get("/edit_product/:productId",adminController.getEditProduct)

router.get("/products",adminController.getProducts)

router.post('/add-product',adminController.postAddProduct)

router.post('/edit_product',adminController.postEditProduct)

router.post('/delete-product',adminController.postDeleteProduct)

router.post('/delete-item',adminController.postDeleteItme)

exports.routes=router
