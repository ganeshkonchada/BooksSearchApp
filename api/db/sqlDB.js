const mysql=require('mysql');

const connection=mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database : process.env.SQL_DB
});

connection.connect((error)=>{
    if(error){
        throw error;
    }
    console.log("mySQL DB Connected")
});

module.exports=connection;