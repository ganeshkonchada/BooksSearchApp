const mongoose=require('mongoose');

const dbURL=process.env.MONGODB_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology : true
}).then((success)=>{
    console.log('MongoDB connected successfully')
}).catch((error)=>{
    console.log('MongoDB not connected: ' + error);
});