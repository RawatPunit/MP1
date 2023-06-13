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
    name : 'production'
}

module.exports  = development;