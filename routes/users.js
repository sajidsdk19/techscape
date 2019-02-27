var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');

router.use(expressValidator());
var multer=require('multer');
var upload=multer({dest:'./uploads'});
var Users=require('../model/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/platform', function(req, res, next) {
  res.render('platform');
});



router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup',upload.single('profileimg'), function(req, res, next) {
 //res.redirect('/signup');
  console.log(req.body.username);
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.password2);
  console.log(req.file);


  var name=req.body.name;
  var username=req.body.username;
  var email=req.body.email;
  var pass=req.body.password;
  var pass2=req.body.password2;
  var file=req.file;

  if (req.file) {
    console.log("uploading file ");
    var image = req.file.filename;
  } else {
    console.log("NO files uploaded ");
  }

  //Validators
  req.checkBody('name','Name is Required').notEmpty();
  req.checkBody('username', 'User Name is Required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);


  var errors = req.validationErrors();

  if (errors) {
    var validationMessages = ''
    for (var key in errors) {
      validationMessages = validationMessages + errors[key].msg + '\n';
    }
    res.render("error", {
      message: "Please Make Sure you typed correctly",
      validations: validationMessages
    });
    console.log("Errors");
  } else {
    console.log("success");

    
  //Saving Users in database s=================
  var newUser= new Users({
    username:username,
    name:name,
    email:email,
    password:pass,
    profileImage:image
   });
 
   Users.createuser(newUser,function(err,user){
     if(err) {
       console.log("Error Occured"+err);
     }//throw err;
     console.log(user)
     console.log("saved in db");

  
   });
 
   res.location('/users/platform');
   res.redirect('/users/platform');  

  }


 

});







router.post('/register', function(req, res, next) {
  req.checkBody('email', 'Invalid email address').isEmail();
  req.checkBody('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});















router.post('/login', function(req, res, next) {

  var username=req.body.username;
  var password=req.body.pass;
   console.log(req.body.username);
   console.log(req.body.pass);

 
  //  expressValidator.req.checkBody("username","User Name is Required").notEmpty();
  //  var errors =req.validationErrors();

  //  if(errors)
  //  {
  //    res.render('signin',{
  //      errors: errors
  //    });
  //  //console.log("Errors");
  //  }else{
  //    console.log("success");
  //  }
   
});



module.exports = router;
