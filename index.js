const express  = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts =  require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal =  require('./config/passport-local-strategy');
const MongoStore   = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
    src : '/assets/scss',
    dest : '/assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
//reading through the post request
app.use(express.urlencoded)
//calling the cookie parser
app.use(cookieParser());

//telling the app to use the cookie 
app.use(express.static('./assets'));

//let browser know where i will be putting the app looking out for static files
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//setting a middleware
//mongo store is used to store the session cookie in the DB
app.use(session({
    name : 'codiel',
    //change the secret before deployment this is an encrypted key
    secret : '',
    saveUninitialized : false,
    resave: false,
    //session expiry like 10 minutes and all etc.
    Cookie : {
        maxAge: (1000*60*1000)
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongoose setup ok');
        }
    )
}));

app.use(passport.initialize);
app.use(passport.session);

app.use(passport.setAuthenticatedUser);
//this above will go to passport local startegy and excute the abpve fucntion for authentication

//use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Serve is running on port ${port}`);
})