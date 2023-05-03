//export the publically avilable route files
module.exports.home =  function (req,res){
    return res.end('<h1> Express is up for codiel!</h1>')
}