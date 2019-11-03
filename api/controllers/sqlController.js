const con=require('../db/sqlDB');
const util=require('util');
con.query=util.promisify(con.query);

const controller= {
    home : (req, res)=>{
        res.send('Hi there!! Welocome to Books search app.')
    },

    createBook : async (req,res)=>{
        let query= 'insert into books set ?';
        try {
            const row = await con.query(query, req.body);
            const insertedRow=await con.query('select * from books where id=?', row.insertId);
            res.send(insertedRow);
        } catch (error) {
            if(error) throw error;
        }
    },

    getAllBooks : async (req,res)=>{
        const query = 'select * from books';
        try{
        const result=await con.query(query);
        res.send(result);
        }catch(error){
            if (error) throw error; 
        }
    },

    getBookByStatus : async (req,res)=>{
        let query= 'select * from books where status=?';
        try {
            const books=  await  con.query(query, req.params.status);
            res.send(books);
        } catch (error) {
            if(error) throw error;
        }
    },

    getBookById : async (req,res)=>{
        let query= 'select * from books where id=?';
        try {
            const books=  await  con.query(query, req.params.id);
            res.send(books);
        } catch (error) {
            if(error) throw error;
        }
    },

    getBookByISBN : async (req,res)=>{
        let query= 'select * from books where ISBN=?';
        try {
            const books=  await  con.query(query, req.params.isbn);
            res.send(books);
        } catch (error) {
            if(error) throw error;
        }
    },

    updateBook : (req,res)=>{
        let query= 'update books set ? where id=?';
        con.query(query, [req.body, req.params.id],(err,rows)=>{
            if(err) throw err;
            res.send(rows);
        });
    },

    getAllAuthors : async (req,res)=>{
        let query= 'select author from books';
        try{
            const result=await con.query(query);
            res.send(result);
        }catch(error){
            if (error) throw error; 
        }
    },

    deleteBook : async (req,res)=>{
        let query= 'delete from books where id=?';
        try {
            const books=  await  con.query(query, req.params.id);
            res.send(books);
        } catch (error) {
            if(error) throw error;
        }
    }
}

module.exports=controller;