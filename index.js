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
const passportJWT =  require('./config/passport-jwt-startegy')
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore   = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('/config/middleware')


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

//make the upload paths available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

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

app.use(flash()); //used only after the session , helps flashing the messge
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Serve is running on port ${port}`);
})