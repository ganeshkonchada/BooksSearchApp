const User=require('../models/usersModel');

const controller= {

    createUser : async (req,res)=>{
        try {
            const user=new User(req.body);
            const token=await user.generateAuthTokens();
            const result=await user.save();
            res.status(200).send({'user':result, 'token': token});
        } catch (error) {
            res.status(400).send(error);
        }
    },

    loginUser : async (req,res)=>{
        try {
            const user=await User.findByCredentials(req.body.email, req.body.password);
            const token=await user.generateAuthTokens();
            const result=await user.save();
            res.status(200).send({"user":result, "token":token});
        } catch (error) {
            res.status(400).send(error);
        }
    },

    logoutUser : async (req,res)=>{
        try {
            req.user.tokens=req.user.tokens.filter((tokenObj)=>{
                return tokenObj.token!==req.token;
            })
            await req.user.save();
            res.send('User Logged Out successfully');
        } catch (error) {
            res.send(error);
        }
    },

    readUser : async (req,res)=>{
        try {
            res.send(req.user);
        } catch (error) {
            res.send(error);
        }
    },

    updateUser : async (req,res)=>{
        try {
            const user=await User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true});
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    },

    deleteUser : async (req,res)=>{
        try {
            const user=await User.findByIdAndRemove(req.user._id);
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    },

    getAllUsers : async (req,res)=>{
        try {
            const users=await User.find({});
            res.send(users);
        } catch (error) {
            res.send(error);
        }
    },

    getUserById : async (req,res)=>{
        try {
            const user=await User.findById(req.params.id);
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    },

    logoutAll: async(req,res)=>{
        try {
            req.user.tokens=[];
            await req.user.save();
            res.send('Logged out successfully');
        } catch (error) {
            res.status(500).send();
        }
    }

}

module.exports=controller;