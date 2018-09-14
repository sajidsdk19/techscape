var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

router.use(expressValidator());
var multer = require('multer');
var upload = multer({
  dest: './uploads'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', upload.single('profileimg'), function (req, res, next) {
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.password2);
  console.log(req.file);
  // var username=req.body.username;
  // var email=req.body.email;
  // var pass=req.body.password;
  // var pass2=req.body.password2;
  // //var file=req.file;

  if (req.file) {
    console.log("uploading file ");
    var image = req.file.filename;
  } else {
    console.log("NO files uploaded ");
  }

  router.get('/check', function (req, res, next) {
    res.render('check');
  });

  router.post('/check', function (req, res, next) {
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({
      min: 4
    }).equals(req.body.confirmPassword);

    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
    } else {
      req.session.success = true;
    }
    res.redirect('/');
  });



  //Validators
  req.checkBody("username", "User Name is Required").notEmpty();
  // req.checkBody('email','Email is not valid').isEmail();
  // expressValidator.req.checkBody('password','Password field is required').notEmpty();
  // req.checkBody('password2','Password do not match').equals(req.password);


  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
    //console.log("Errors");
  } else {
    console.log("success");
  }
});

router.post('/login', function (req, res, next) {

  var username = req.body.username;
  var password = req.body.pass;
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