// const { adminServiceController } = require("../../../service/index");
const { errorMsg, successMsg } = require('../Utils/index');
const {createAdmin, findOneAdmin}= require('../Repositary/AdminRepositary');

const AdminController = {
    /**
     * create admin
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    create : async (req, res, next) => {
        try {
            const payload = req?.body;
            // const user = await adminServiceController.createAdmin(payload);
            const checkUserExist = await findOneAdmin({
                email_id: payload.email_id
            });
            if (!checkUserExist) {
                const createRecord = await createAdmin({
                    firstname: payload?.firstname,
                    lastname: payload?.lastname,
                    status: payload?.status,
                    email_id: payload?.email_id,
                    mobile_no: payload?.mobile_no,
                    user_name: payload?.user_name,
                    password: payload?.password,
                    confirm_password: payload?.confirm_password,
                    access_location: payload?.access_location,
                    delete_status: payload?.delete_status,
                    last_login: new Date(),
                    role: 'admin'
                });
    
                if (!createRecord) throw new Error(errorMsg.USER_ALREADY_EXIST);
    
                return res.json({
                    Status: 'Success',
                    Message: successMsg.ADMIN_CREATED_SUCCESSFULLY,
                    Data: createRecord,
                    Code: 200
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AdminController;
