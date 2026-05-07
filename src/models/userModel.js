const mongose= require("mongoose");

const userSchema = new mongose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true, minlength:6},
    role:{
        type: String,
        enum:["user","provider"],
        default:"user"
    }
},{ timestamps: true });

const User = mongose.model("User", userSchema);

module.exports = User;