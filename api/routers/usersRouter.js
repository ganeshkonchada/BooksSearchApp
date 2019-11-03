const express=require('express');
const router=new express.Router();
const controller=require('../controllers/usersController');
const auth=require('../middleware/auth');

router.post('/api/user', controller.createUser);
router.post('/api/user/login', controller.loginUser);
router.get('/api/user/me', auth, controller.readUser);
router.put('/api/user/update', auth, controller.updateUser);
router.delete('/api/user/delete', auth, controller.deleteUser);
router.post('/api/user/logout', auth,  controller.logoutUser);
router.get('/api/users', controller.getAllUsers);
router.get('/api/user/id/:id', controller.getUserById);
router.post('/api/user/logoutAll',auth, controller.logoutAll);

module.exports=router;