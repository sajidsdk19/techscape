var express = require('express');
var router = express.Router();
var expressValidator=require('express-validator');
var passport=require('passport');
var LocalStratgegy=require('passport-local').Strategy
router.use(expressValidator());

var multer=require('multer');
var upload=multer({dest:'./uploads'});
var Users=require('../model/users');
var flash=require('connect-flash');


router.use(flash());



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


router.get('/blog',function(req,res,next){
res.render('blog');
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
    console.log("No files uploaded ");
  }

  //Validators
  req.checkBody('name','Name is Required').notEmpty();
  req.checkBody('username','User Name is Required').notEmpty();
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
    console.log("Failed to store in DB ");
  } else {
    console.log("successfully entered into Db");
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
 
   res.location('/');
   res.redirect('/');

  }
});





// router.post('/login',function(req, res) {

//     // var username=req.body.username;
//     // var password=req.body.pass;
//      console.log(req.body.username);
//      console.log(req.body.pass);
//      //console.log(req);

//     //If this function gets called, authentication was successful.
//     //req.user` contains the authenticated user.
//     //req.flash('you are now logged in ');
//     //res.redirect('/');
//   });




// router.post('/login', function(req, res) {
//   // req.checkBody('email', 'Invalid email address').isEmail();
//   // req.checkBody('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
//     console.log("function called");
//      console.log(req.body.username);
//      console.log(req.body.pass);
// //   res.redirect('/');
// });



router.post('/login',
passport.authenticate('local'),
function(req, res) {

console.log(req.body.username);
console.log(req.body.pass);  
//req.flash('success','you are now logged in ');
//res.redirect('/');

});



  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.GetUserByID(id, function(err, user) {
      done(err, user);
    });
  });

 

passport.use(new LocalStratgegy(function(username,password,done){

  User.GetUserByUsername(username,function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message:'Unknown user '});
      } 
      

      User.ComparePassword(password,user.password,function(err,IsMatch){
        if(err) return done(err);
        if(IsMatch){
        return done(null,user);
         }else{
        return done(null,false,{message:'Invalid Password'});
      }
      });
     });
  }));

module.exports = router;
