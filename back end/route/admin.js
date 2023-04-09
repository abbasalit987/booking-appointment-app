const path = require('path');

const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

router.post('/user/add-user', adminController.addUser);

router.get('/user/get-users', adminController.getUsers);

router.delete('/user/delete-user/:id', adminController.deleteUser);

module.exports = router;
