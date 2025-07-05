const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//mongodb conection
mongoose.connect('mongodb+srv://admin:147258369@cluster99.p3ti9l9.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster99', {
    tls: true,
    tlsAllowInvalidCertificates: true
  });

    global.loggedIn = null

//conreoller
const indexcontroller = require('./controllers/indexcontroller')
const logincontroller = require('./controllers/logincontroller')
const registercontroller = require('./controllers/registercontroller')
const storeusercontroller = require('./controllers/storeusercontroller')
const loginusercontroller = require('./controllers/loginusercontroller')
const logout = require('./controllers/logout')
const homecontroller = require('./controllers/homecontroller')


//middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexcontroller)
app.get('/home', authMiddleware, homecontroller)
app.get('/login', redirectIfAuth, logincontroller)
app.get('/register', redirectIfAuth, registercontroller)
app.post('/user/register', redirectIfAuth, storeusercontroller)
app.post('/user/login', redirectIfAuth, loginusercontroller)
app.get('/logout', logout)

 
app.listen(4000, () =>{
    console.log("App listening on port 4000")
})


