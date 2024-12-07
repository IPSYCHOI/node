const mongoose=require("mongoose")
const Schema = mongoose.Schema
const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ]
    }
})
userSchema.methods.addToCart=function(product){
    const updatedCartItemIndex=this.cart.items.findIndex(cp=>{
    return cp.productId.toString() === product._id.toString()
    })
    let updatedCartItems=[...this.cart.items]
    if(updatedCartItemIndex>=0){
        let newqty=this.cart.items[updatedCartItemIndex].quantity=this.cart.items[updatedCartItemIndex].quantity + 1;
        updatedCartItems.quantity=newqty
    }else{
        updatedCartItems.push({productId:product._id,quantity:1})
    }
    const updatedCart={
        items:updatedCartItems
    }
    this.cart=updatedCart
    return this.save()    
}
userSchema.methods.removeFromCart=function(prodId){
    const updatedCartitems=this.cart.items.filter(item=>{
        return item.productId.toString() !== prodId.toString()
    })
    this.cart.items=updatedCartitems
    return this.save()
}
userSchema.methods.clearCart=function(){
    this.cart={
        items:[]
    }
    return this.save()
}
module.exports = mongoose.model("User",userSchema);
// const mongoDb= require("mongodb")
// class User{
// 	constructor(username,email,cart,id){
// 		this.name=username
// 		this.email=email
// 		this.cart=cart
// 		this._id=id
// 	}
// 	save(){
// 		const db =getDb()
// 		return db.collection("users")
// 		.insertOne(this)
// 		.then(r=>{
// 			console.log("user added successfully!")
// 		})
// 		.catch(err=>{
// 			console.log(err)
// 		})

// 	}
// 	addToCart(product){
// 		const db =getDb()

// 		const updatedCartItemIndex=this.cart.items.findIndex(cp=>{
// 		return cp.productId.toString() === product._id.toString()
// 		})
// 		let updatedCartItems=[...this.cart.items]
// 		if(updatedCartItemIndex>=0){
// 			let newqty=this.cart.items[updatedCartItemIndex].quantity=this.cart.items[updatedCartItemIndex].quantity + 1;
// 			updatedCartItems.quantity=newqty
// 		}else{
// 			updatedCartItems.push({productId:product._id,quantity:1})
// 		}
// 		const updatedCart={
// 			items:updatedCartItems
// 		}
// 		return db.collection("users").updateOne({_id:new mongoDb.ObjectId(this._id)},{$set:{cart:updatedCart}})
		
// 	}
// 	static findById(id){
// 		const db =getDb()
// 		return db.collection("users").findOne({_id:new mongoDb.ObjectId(id)})
// 	}
// }
// module.exports = User;
