const express=require('express');
const { addAdmin, adminLogin, getAdmins, getAdminById } = require('../controllers/adminController');
const router=express.Router();

router.route('/admin/signup').post(addAdmin);
router.route('/admin/login').post(adminLogin);
router.route('/admin/getAdmins').get(getAdmins);
router.route('/admin/:id').get(getAdminById)

module.exports = router;