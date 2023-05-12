const express=require('express');
const { newBooking,getBookingById, deleteBooking } = require('../controllers/bookingController');
const router=express.Router();

router.route('/newbooking').post(newBooking)
router.route('/booking/:id').get(getBookingById)
router.route('/booking/delete/:id').delete(deleteBooking)

module.exports = router;