const Book=require('../models/booksModel');

const controller= {
    home : (req, res)=>{
        res.send('Hi there!! Welocome to Books search app.')
    },

    createBook : async (req,res)=>{
        try {
            const book=new Book({...req.body, ownerId : req.user._id});
            const result=await book.save();
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    },

    getAllBooks : async (req,res)=>{
        try {
            const books=await Book.find({ownerId: req.user._id});
            if(books.length==0){
                res.send('No book available for the user');
            }
            res.send(books);
        } catch (error) {
            res.send(error);
        }
    },

    getBookByStatus : async (req,res)=>{
        try {
            const books=await Book.find({status: req.params.status, ownerId: req.user._id});
            if(books.length==0){
                res.send('No book available');
            }else{
                res.send(books);
            }
        } catch (error) {
            res.send({'Error': error});
        }
    },

    getBookById : async (req,res)=>{
        try {
            const books=await Book.findOne({_id: req.params.id, ownerId: req.user._id});
            res.status(200).send(books);
        } catch (error) {
            res.status(400).send('Please enter Valid ID');
        }
    },

    getBookByISBN : async (req,res)=>{
        try {
            const books=await Book.find({ISBN: req.params.isbn, ownerId: req.user._id});
            if(books.length==0){
                res.send('Please enter valid ISBN number')
            }else{
                res.send(books);
            }
            
        } catch (error) {
            res.send(error);
        }
    },

    updateBook : async (req,res)=>{
        try {
            const book=await Book.findOneAndUpdate({_id: req.params.id, ownerId: req.user._id}, {$set: req.body}, {new: true});
            res.send(book);
        } catch (error) {
            res.status(400).send('Please enter Valid ID');
        }
    },

    getAllAuthors : async (req,res)=>{
        try {
            const authors=await Book.find({ownerId: req.user._id}, {author: true, _id: false});
            if(authors.length==0){
                res.send('No book available for the user');
            }
            res.send(authors)
        } catch (error) {
            res.send(error);
        }
    },

    deleteBook : async (req,res)=>{
        try {
            const book=await Book.findOneAndUpdate({_id: req.params.id, ownerId: req.user._id},{$set:{status: "deleted"}},{new : true});
            res.send(book);
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports=controller;