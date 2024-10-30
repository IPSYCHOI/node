const path = require("path")
const fs = require("fs")
const rootDir = require("../util/path")
const { json } = require("body-parser")
const p = path.join(rootDir,"data","cart.json")
const getProductFromFile=(cb)=>{
    fs.readFile(p,(err,filecontent)=>{
        if(filecontent.length > 0){
            cb(JSON.parse(filecontent))
        }else{
            cb(null)
        }
    })
}
module.exports=class cart{
    static addProduct(id,price){
        //fetch the previous cart
        let cart={"products":[],"totalPrice":0}
        fs.readFile(p,(err,fileContent)=>{
            if(fileContent.length > 0){
                cart=JSON.parse(fileContent)
                
            }
            let products=cart.products
            let existProduct=products.find(product=>product.id === +id)
            if(existProduct){
                let productqty=existProduct.qty
                let totalPrice=cart.totalPrice+ +price
                productqty++
                existProduct={...existProduct,"qty":productqty}
                let remove=cart.products.find(product=>product.id === +id)
                let removeIndex= cart.products.indexOf(remove)
                cart.products[removeIndex]=existProduct
                cart={...cart,"products":cart.products,"totalPrice":totalPrice}
                fs.writeFile(p,JSON.stringify(cart),(err)=>{console.log(err)})
            }else{
                let newProduct={"id":+id,"qty":1}
                let totalPrice=cart.totalPrice+ +price
                cart.products.push(newProduct)
                cart={...cart,"totalPrice":totalPrice}
                fs.writeFile(p,JSON.stringify(cart),(err)=>{console.log(err)})
            }
        })
    }
    static delete(id,price,qty=1){
        getProductFromFile((data)=>{
            const products = data.products
            const totalPrice=data.totalPrice
            const deletedProductIndex=products.findIndex(p=>p.id=== +id)
            const deletedProduct=products.find(p=>p.id === +id)
            if(!deletedProduct){
                return
            }
            if(+qty!=1){
                const updatedPrice=totalPrice-(qty* +price)
                deletedProduct.qty=deletedProduct.qty-qty
                products[deletedProductIndex]=deletedProduct
                data={...data,"products":products,"totalPrice":updatedPrice}
                fs.writeFile(p,JSON.stringify(data),(err)=>{
                    console.log(err)
                })
            }else if(+qty==1&& +deletedProduct.qty!=1){
                const updatedPrice= +(totalPrice-(deletedProduct.qty* +price))
                deletedProduct.qty=deletedProduct.qty-qty
                products[deletedProductIndex]=deletedProduct
                data={...data,"products":products,"totalPrice":updatedPrice}
                fs.writeFile(p,JSON.stringify(data),(err)=>{
                    console.log(err)
                })

            }else{
                const updatedPrice=totalPrice-(qty* +price)
                products.splice(deletedProductIndex,1)
                data={...data,"products":products,"totalPrice":updatedPrice}
                fs.writeFile(p,JSON.stringify(data),(err)=>{
                    console.log(err)
                })

            }
        })
    }
    static fetchAllCart(cb){
        const Product=require("../models/product")
        getProductFromFile((data)=>{
            if(data==null){
                cb(null,null)
            }else{
                const cartProducts=data.products
                const ids=[]
                const commonProds =[]
                Product.fetchAll((products)=>{
                    for(let p of cartProducts){
                        
                        ids.push(p.id)
                    } 
                    for(let id of ids){
                        const product =products.find(product=>product.id === id.toString())
                        if(product){
                            const cartproduct=cartProducts.find(pro=>pro.id === id)
                            const prodqty=cartproduct.qty
                            const updatedProduct={...product,qty:prodqty}
                            commonProds.push(updatedProduct)
                        }
                    }
                    cb(commonProds,data)
                })
                }
            
        })
        
    }
}
