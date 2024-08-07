const express = require('express');
const Routers = express.Router();
const { VerifyToken } = require('../Utils/jwt');
const AdminControllers = require('../Controllers/AdminControllers');

Routers.post('/create', VerifyToken ,(req, res) =>{
    return AdminControllers.create(req , res);
});
// Router.post('/login', adminLogin);
// Router.get('/list', VerifyToken, getAdminList);
// Router.get('/getadmin/:id', VerifyToken, getAdminById);
// Router.put('/update/:id', VerifyToken, adminRecordUpdate);
// Router.put('/delete/:id', VerifyToken, deleteAdmin);

module.exports = Routers;
