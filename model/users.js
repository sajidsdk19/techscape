var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/techscape");
var db=mongoose.connection;

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
    newUser.save(callback);


}