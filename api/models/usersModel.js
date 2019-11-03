const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name : {type: String, required:true},
    age : {type:Number, default: 18},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    tokens: [{
        token:{type: String, required: true}
        }]
    },
    {
        timestamps : true
    }
)

userSchema.pre('save', async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next();
})

userSchema.statics.findByCredentials= async (email, password)=>{
    const user=await User.findOne({email: email});
    if(!user){
        return "Please enter valid user name (email)";
    }
    const isValid= await bcrypt.compare(password, user.password);
    if(!isValid){
        return "Your password is incorrect";
    }
    return user;
}

userSchema.methods.generateAuthTokens=async function(){
    const user=this;
    const token=jwt.sign({_id: user._id.toString()}, process.env.JWT_SIGN);
    user.tokens=user.tokens.concat({token});
    //user.tokens.push({token});
    return token;
}

const User=mongoose.model('user', userSchema);

module.exports=User;