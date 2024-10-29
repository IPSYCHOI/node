const path = require("path")
const fs = require("fs")
const rootDir = require("../util/path")
const { json } = require("body-parser")
const p = path.join(rootDir,"data","cart.json")
module.exports=class cart{
    static addProduct(id,price){
        //fetch the previous cart
        let cart={"products":[],"totalPrice":0}
        fs.readFile(p,(err,fileContent)=>{
            if(fileContent.length !==0){
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
}
