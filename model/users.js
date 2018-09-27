var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/techscape");
var db=mongoose.connection;
var bcrypt=require('bcryptjs');

//user scheme
var userschema=mongoose.Schema({

    
    username:{
        type:String,
        //createIndexes:true,
    },
    name:{
        type:String
    },
    password:{
        type:String
    },
    email:{
      type:String  
    },
    password:{
        type:String
    },
    ProfileImg:{
        type:String
    }

});


var User=module.exports=mongoose.model('user',userschema);

module.exports.createuser=function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password=hash;
            newUser.save(callback);

        });
    });

}

module.exports.GetUserByID=function(id,callback){
    User.findById(id,callback);
}    
module.exports.GetUserByUsername=function(username,callback){
    var query={username:username};
    User.findOne(query,callback);
}

module.exports.ComparePassword=function(candaditePassword,hash,callback){
    // Load hash from your password DB.
bcrypt.compare(candaditePassword, hash, function(err, isMatch) {
    callback(null,isMatch);
});
}




