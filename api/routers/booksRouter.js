const express=require('express');
const router=new express.Router();
const controller=require('../controllers/booksController');
const auth=require('../middleware/auth');

router.get('/', controller.home);
router.post('/api/book', auth, controller.createBook);
router.get('/api/books', auth, controller.getAllBooks);
router.get('/api/books/status/:status', auth, controller.getBookByStatus);
router.get('/api/book/id/:id', auth, controller.getBookById);
router.get('/api/book/isbn/:isbn', auth, controller.getBookByISBN);
router.put('/api/book/:id', auth, controller.updateBook);
router.get('/api/authors', auth, controller.getAllAuthors);
router.delete('/api/book/delete/:id',auth, controller.deleteBook);

module.exports=router;