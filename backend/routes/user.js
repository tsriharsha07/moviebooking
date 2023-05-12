const express=require('express');
const { getUsers,createUser,updateUser, logIn, deleteUser, getBookingsOfUser, getUserById } = require('../controllers/userController');
const router=express.Router();

router.route('/getUsers').get(getUsers)
router.route('/signup').post(createUser)
router.route('/update/:id').put(updateUser)
router.route('/login').post(logIn)
router.route('user/delete/:id').delete(deleteUser)
router.route('/user/bookings/:id').get(getBookingsOfUser)
router.route('/user/:id').get(getUserById);

module.exports = router;