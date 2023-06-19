const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join 

const development = {
    name : 'development',
    asset_path: '/assets',
    session_cookie_key : 'Something',
    db : 'codiel_development',
    smtp : {
        service : 'gmail',
        host: 'smtp.google.com',
        port : 587,
        secure : false,
        auth :{
            user : 'alchemy.cn18',
            pass : 'Punnu'
        }
    },
    google_client_id : "1023200451763-6646qdn8edcmscrsech6f21nqvl3sk0k.apps.googleusercontent.com",
    google_client_Secret : "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",
    google_call_back_URL : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codiel'
}

const production = {
    name : 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db :  process.env.CODEIAL_DB,//'codiel_production'
    smtp : {
        service : 'gmail',
        host: 'smtp.google.com',
        port : 587,
        secure : false,
        auth :{
            user : 'alchemy.cn18',
            pass : 'Punnu'
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_URL : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET //'5WXaT1QZgIN7DCuAPmeyo72mkVsXBvcO'
}

module.exports  = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);