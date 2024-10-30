const Product=require("../models/product")
const Cart=require("../models/cart")


const getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render("shop/product_list",{prods:products,title:"All Products",path:"/products"})
    })
    
}
const getOneProduct=(req,res,next)=>{
    const prodId=req.params.productId
    Product.findById(prodId,(p)=>{
        res.render("shop/product_detail",{product:p,title:p.title,path:"/product"})
    })
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
    const err=req.query.err
    Cart.fetchAllCart((commProds,data)=>{
        if(commProds==null){
            res.render("shop/cart",{prods:0,data:data,title:"cart",path:"/cart"})
        }else{
            if(err){
                res.render("shop/cart",{prods:commProds,error:err,data:data,title:"cart",path:"/cart"})

            }else{
                res.render("shop/cart",{prods:commProds,data:data,title:"cart",path:"/cart"})

            }

        }        
    })
}
const postCart=(req,res,next)=>{
    const prodId=req.body.productId
    Product.findById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price)

    })
    res.redirect("/")

    
}
const getCheckout=(req,res,next)=>{
    
    res.render("shop/checkout",{title:"checkout",path:"/checkout"})
    
    
}

exports.getProducts=getProducts
exports.getOneProduct=getOneProduct
exports.getIndex=getIndex
exports.getCart=getCart
exports.postCart=postCart
exports.getCheckout=getCheckout
exports.getOrders=getOrders
