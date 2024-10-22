const path = require("path")
const fs = require("fs")
const rootDir = require("../util/path")
const p = path.join(rootDir,"data","products.json")
const getProductFromFile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err|| fileContent.length===0){
            return cb([])
        }
        cb(JSON.parse(fileContent))

 })
}
module.exports=class product{
    title
    price
    dis
    id
    constructor(title,price,des,imageUrl){
        this.title=title
        this.price=price
        this.des=des
        this.imageUrl=imageUrl
    }
    static findById(id,cb){
       getProductFromFile(products=>{
        const product = products.find(p=>p.id === id)
        cb(product)
       })
    }
    save(){
        this.id=Math.random().toString()
        getProductFromFile((products)=>{
                products.push(this)
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            })
        })
    
    }

    static fetchAll(cb){
     getProductFromFile(cb)  
    }
}
