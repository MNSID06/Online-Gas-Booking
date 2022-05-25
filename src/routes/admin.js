const express = require('express')
const router = new express.Router();
const adminController = require('../controller/adminController')
const userController = require('../controller/userController')
router.post('/admin/adminLogin', adminController.adminLogin)
router.get('/admin/users', adminController.getUsers, userController.grantAccess('readAny', 'updateAny', 'profile'))

router.patch('/admin/update/:id', adminController.updateUser, userController.grantAccess)
router.delete('/admin/deleteuser/:id', adminController.deleteUser, userController.grantAccess)
module.exports = router;