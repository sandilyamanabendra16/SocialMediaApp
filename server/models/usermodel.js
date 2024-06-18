const mongoose=require('mongoose')

const User= mongoose.Schema(
    { 	username:{ type:String, required:true }, 	
    password:{ type:String, required:true },
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    isAdmin:{type:Boolean, default:false},
    profilephoto: String,
    coverphoto:String,
    livesin:String,
    worksat: String,
    relationship:String,
    country:String,
    followers:[],
    following:[]
},
    {timestamps:true}
)

module.exports=mongoose.model('User', User)