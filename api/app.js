const express=require('express');
const app=express();
const port=process.env.PORT;

app.use(express.json());

require('./db/mongoDB');
const usersRouter=require('./routers/usersRouter');
app.use(usersRouter);
const booksRouter=require('./routers/booksRouter');
app.use(booksRouter);

app.listen(port, ()=>{
    console.log('App is listening to port: ' + port);
})