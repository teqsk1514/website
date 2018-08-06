var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/user-data');


//mongoose.connection;

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: {type: String, required: true},
  email: String,
  message: String
});


//creating the model

var UserData = mongoose.model('usersdata', userDataSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about',function(req,res,next){
  res.render('about');
});


router.get('/contact',function(req,res,next){
  res.render('contact', { title: 'Contact us', success: req.session.success, errors : req.session.errors });
  req.session.errors = null;
});


router.get('/signup',function(req,res,next){
  res.render('signup');
});

var data = function(req, res, next) {
  
  var item = {
    name: req.body.user,
    email: req.body.email,
    message: req.body.message
  };


  req.check('user','Invalid User Name').isAlpha();//should match the name atrrib of the input tag.
  req.check('email','Invalid Email ID').isEmail();
  req.check('message','Minimum length Should Be Of 15 Character').isLength({min:15});

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  }else{
    req.session.success = true;

    var data = new UserData(item);
  data.save();

    // mongo.connect(url, function(err, db) {
    //   assert.equal(null, err);
    //   db.db('user-data').collection('user').insertOne(item, function(err, result) {
    //     assert.equal(null, err);
    //     console.log('Item inserted');
    //     db.close();
    //   });
    // });
  }
  res.redirect('/contact');
}

router.post('/insert',data);

module.exports = router;
