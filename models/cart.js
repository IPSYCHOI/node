const path = require("path")
const fs = require("fs")
const rootDir = require("../util/path")
const { json } = require("body-parser")
const p = path.join(rootDir,"data","cart.json")
const getProductFromFile=(cb)=>{
    fs.readFile(p,(err,filecontent)=>{
        cb(JSON.parse(filecontent))
    })
}
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
    static delete(id,price){
        getProductFromFile((data)=>{
            const products = data.products
            const deletedProduct=products.find(p=>p.id=== +id)
            const deletedProductIndex=products.findIndex(p=>p.id=== +id)
            const qty = deletedProduct.qty
            const totalPrice=data.totalPrice
            const updatedPrice=totalPrice-(qty* +price)
            products.splice(deletedProductIndex,1)
            data={...data,"products":products,"totalPrice":updatedPrice}
            fs.writeFile(p,JSON.stringify(data),(err)=>{
                console.log(err)
            })
            console.log(products)
        })
    }
}
