const Product=require("../models/product")

const getAddProduct=(req,res,next)=>{
    
    res.render("admin/add-product",{title:"Add product",path:"/admin/add-product"})
}

const postAddProduct =(req,res, next)=>{
    const price=req.body.price
    const des=req.body.des
    const imageUrl=req.body.imageUrl
    const title=req.body.title
    const product=new Product(title,price,des,imageUrl)
    product.save()
    res.redirect("/")
}
const getProducts =(req,res, next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/products",{prods:products,title:"All Products",path:"/admin/products"})
    })
}

exports.getAddProduct=getAddProduct
exports.postAddProduct=postAddProduct
exports.getProducts=getProducts