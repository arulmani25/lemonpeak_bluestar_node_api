const jwt = require('jsonwebtoken');
const {findOneUser}= require('../Repositary/UserRepositary');
const {findOneAdmin} = require('../Repositary/AdminRepositary')
const { roles } = require('./enum');

const generateToken = async (payload) => {
    try {
        const secretKey = 'asdsadgjsahdyeadjhsjdgasyfdhgsadhgasdhgsacdhas';

        const token = jwt.sign(payload, secretKey);

        return token;
    } catch (error) {
        console.log(error);
    }
};

const VerifyToken = async (req, res, next) => {
    try {
        const secretKey = 'asdsadgjsahdyeadjhsjdgasyfdhgsadhgasdhgsacdhas';

        if (!req.headers.authorization) throw new Error('Provide a valid JWT Token');

        const token = req.headers.authorization?.split(' ')[1];

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.json({ status: 401, message: 'Invalid Token' });
            } else {
                let loggedUser = {
                    userId: decoded._id,
                    role: decoded.role,
                    user_type: decoded.user_type
                };
                let userExist;
                if (decoded.role === roles.admin) {
                    userExist = await findOneAdmin({
                        _id: loggedUser.userId
                    });
                } else {
                    userExist = await findOneUser({
                        _id: loggedUser.userId
                    });
                }

                if (!userExist) {
                    return res.json({ status: 401, message: 'UnAuthorized User' });
                }
                req.loggedUser = loggedUser;
                next();
            }
        });
    } catch (error) {
        return res.json({ status: 401, message: error.message });
    }
};

module.exports = { generateToken, VerifyToken };
