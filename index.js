var express = require('express');
let mongoose = require('mongoose');
var bodyParser = require('body-parser')
// var popup = require('popups');
let alert = require('alert');
var _ = require('lodash');  

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const userSchema = new mongoose.Schema({
    email: String,
    password:String
});

const User = mongoose.model('User', userSchema);
app.get('/', (req, res)=>{
    res.sendFile('views/index.html', {root: __dirname })
})

app.listen(5000, ()=>{
    console.log('server started on port 5000');
})

app.post('/signUp', (req, res)=>{
    const user = new User({
         email: req.body.email,
          password:req.body.pass
         });
    user.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
      res.redirect('/main')
console.log(user.email); 
    // console.log(req.body.email, ' ', req.body.pass);
});

app.post('/', (req,res)=>{
    console.log(req.body.email);
    console.log( req.body.pass);
    User.find({email: req.body.email, password:req.body.pass}, (err, user)=>{
        console.log(user);
        if(!_.isEmpty(user)){
            res.redirect('/main');
        }
        else{
            alert("credentials not valid");
            res.redirect('/')
        }
    });
});

app.get('/main', (req,res)=>{
    res.sendFile('views/main.html', {root: __dirname })
})

app.get('/signUp', (req,res)=>{
    res.sendFile('views/signUp.html', {root:__dirname});
})


