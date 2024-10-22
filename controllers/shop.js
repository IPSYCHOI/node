const Product=require("../models/product")


const getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render("shop/product_list",{prods:products,title:"All Products",path:"/products"})
    })
    
}
const getOneProduct=(req,res,next)=>{
    const prodId=req.params.productId
    
}
const getIndex=(req,res,next)=>{
    
    Product.fetchAll((products)=>{
        res.render("shop/index",{prods:products,title:"shop",path:"/index"})
    })
    
}
const getOrders=(req,res,next)=>{

    
    res.render("shop/orders",{title:"orders",path:"/orders"})
    
    
}
const getCart=(req,res,next)=>{
    
    res.render("shop/cart",{title:"cart",path:"/cart"})
    
    
}
const getCheckout=(req,res,next)=>{
    
    res.render("shop/checkout",{title:"checkout",path:"/checkout"})
    
    
}

exports.getProducts=getProducts
exports.getOneProduct=getOneProduct
exports.getIndex=getIndex
exports.getCart=getCart
exports.getCheckout=getCheckout
exports.getOrders=getOrders
