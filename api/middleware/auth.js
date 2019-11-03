const jwt=require('jsonwebtoken');
const User=require('../models/usersModel');

const auth=async (req, res, next)=>{
    
    try {
        const token=req.header('Authorization').replace("Bearer ", "");
        const decoded=jwt.verify(token,process.env.JWT_SIGN);
        const user=await User.findOne({_id:decoded._id, 'tokens.token': token});
        if(!user){
            throw new Error("No user exists with given token");
        }
        req.user=user;
        req.token=token;
    } catch (error) {
        res.status(404).send('Error : Please authenticate');
    }
    next();
}

module.exports=auth;