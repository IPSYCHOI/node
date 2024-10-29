const Product=require("../models/product")

const getAddProduct=(req,res,next)=>{
    
    res.render("admin/edit_product",{title:"Add product",path:"/admin/add-product",e:false})
}
const getEditProduct=(req,res,next)=>{
    const edit=req.query.edit
    prodId=req.params.productId
    Product.findById(prodId,(product)=>{
        if(edit){
            res.render("admin/edit_product",{title:"Edit product",path:"/admin/edit-product",e:edit,product:product})
        }else{
            res.redirect("/")
        }
    })
  
}

const postAddProduct =(req,res, next)=>{
    const price=req.body.price
    const des=req.body.des
    const imageUrl=req.body.imageUrl
    const title=req.body.title
    const product=new Product(null,title,price,des,imageUrl)
    product.save()
    res.redirect("/")
}
const postEditProduct=(req,res,next)=>{
    const prodId=req.body.id
    const price=req.body.price
    const des=req.body.des
    const imageUrl=req.body.imageUrl
    const title=req.body.title
    const product=new Product(prodId,title,price,des,imageUrl)
    product.save()
    res.redirect("/")
}
const getProducts =(req,res, next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/products",{prods:products,title:"All Products",path:"/admin/products"})
    })
}
const postDeleteProduct=(req,res,next)=>{
    const prodId =req.body.prodId
    Product.delete(prodId)
    res.redirect("/admin/products")
}

exports.getAddProduct=getAddProduct
exports.postAddProduct=postAddProduct
exports.postEditProduct=postEditProduct
exports.getProducts=getProducts
exports.getEditProduct=getEditProduct
exports.postDeleteProduct=postDeleteProduct