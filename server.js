const express = require("express")
require ('./controllers/auth')
const app = express()
const passport = require('passport');
require('dotenv').config();
const session = require("express-session");

app.use(session({
    secret: 'd6095652e0b40667ee326352f343b1cf960d914c93b1952215de5b7a412fe0314535d0ba020e794d59acd213e653b788276193f306f6f2fec7b52791207e24dd',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, ()=>{
    console.log("server started at 3000")
})

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/health', (req,res)=>{
    res.send("Healthy")
})

app.get('/', (req,res)=>{
    res.send('<a href="/auth/google">Authentication with Google</a>')
})

app.get('/protected', isLoggedIn, (req,res)=>{
    res.send(`Great ${req.user.displayName}, you logged in...`)
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

    
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

app.get('/auth/failure', (req,res)=>{
    res.send('Something went wrong')
})

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.send('You are logged out, please log in...');
        });
    });
});
