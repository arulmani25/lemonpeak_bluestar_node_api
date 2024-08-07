const UserModel = require('../Models/UserModel');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const { isEmpty } = require('../Helpers/Utils');

const UserQuery = {
    /***
     * create activity
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createUser: async (queryOptions) => {
        let document = queryOptions ?? {};
        let options = queryOptions ?? {};
        let user = await UserModel.create([document], options);
        return user[0];
    },
    /**
     * find value
     * @param {*} condition
     * @param {*} projection
     * @param {*} useLean
     * @returns
     */
    findOneUser: async (condition, projection) => {
        if (isEmpty(projection)) projection = {};
        let UserData = await UserModel.findOne(condition, projection);
        return UserData;
        // return await ActivityModel.findOne(condition, projection);
    },
    /**
     * find activity
     * @param {*} condition
     * @param {*} projection
     * @param {*} islean
     * @returns
     */
    findUser: async (condition, projection, islean = true) => {
        let user = await UserModel.find(condition, projection).lean(islean);
        return user;
    },
    /**
     * update activity
     * @param {*} condition
     * @param {*} projection
     * @returns
     */
    updateUser: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await UserModel.findOneAndUpdate(condition, projection);
    },
    /**
     * delete value
     * @param {*} condition
     * @returns
     */
    deleteUser: async (condition) => {
        let options = condition || {};
        return await UserModel.deleteOne(condition, options);
    }
};

module.exports = UserQuery;
