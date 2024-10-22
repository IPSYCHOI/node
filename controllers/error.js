const get404=(req,res,next)=>{
    res.status(404).render("404",{title:"404 Not Found"})
}
exports.get404=get404