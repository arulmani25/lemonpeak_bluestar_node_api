const UserTypeModel = require('../Models/UserTypeModel');
const RoleModel = require('../Models/RoleModel');
const { bialRoleSeed, blueStarRoleSeed } = require('../seed/index');

const roleSeedFunction = async () => {
    for (const iterator of blueStarRoleSeed) {
        const data = await UserTypeModel.findOne({
            user_type: 'Blue Star'
        });
        const insertRecord = await RoleModel.create({
            role_type: iterator.role_type,
            user_type: data._id
        });
    }
    for (const iterator of bialRoleSeed) {
        const data = await UserTypeModel.findOne({
            user_type: 'BIAL'
        });
        const insertRecord = await RoleModel.create({
            role_type: iterator.role_type,
            user_type: data._id
        });
    }
};
module.exports = { roleSeedFunction };
