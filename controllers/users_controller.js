const User  =  require('../models/user')



module.exports.profile =  function(req,res){
    if(req.cookies.user_id){
        User.findOne(req.cookie.user_id, function(err,user){
            if(user){
                return res.render('user-profile',{
                    title : "User Profile",
                    user: user
                })
            }
            return res.redirect('/user/sign-in')
        })
    }else{
        return  res.redirect('/users/sign-in')
    }
    //controller si ready to be accessed by the router and
    // the router is ready to be accesed by the browser
    // res.end('<h1> User Profile</h1>');          
    return res.render('user_profile',{
        title : 'User Profile'
    })
}

// render the sign Up page
module.exports.signUp = function(req,res){
    //this loop restrictes to sign up if user is already logged in
    if(req.isAuthenticated()){
       return res.render('/users/profile');
    }
    return res.render('user_sign_up',{
        title : "Codiel | Sign Up "
    })
}
// render the sign in page
module.exports.signIn = function(req,res){
    //this loop restrictes to sign in  if user is already logged in
    if(req.isAuthenticated()){
        res.render('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "Codiel | Sign In "
    })
}

//get the sign up data
module.exports.create = function(req,res){
    //check whether 
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in Signing Up'); return }
    
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finding user in Signing Up'); return }
 
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}


//sign in and create a session for the user
module.exports.createSession = function(req,res){
    //steps to create
    //find the user 
    User.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in Signing In'); return }
         //handle user  found
         if(user){
                //handle passworrd which dont mtach
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                //handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
         }else{
         //handle user not found
        
            return res.redirect('back');
        }
    })
}
module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}