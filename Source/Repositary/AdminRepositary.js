const AdminModel = require('../Models/AdminModel');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const { isEmpty } = require('../Helpers/Utils');

const AdminQuery = {
    /***
     * create activity
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createAdmin: async (queryOptions) => {
        let document = queryOptions ?? {};
        let options = queryOptions ?? {};
        let admin = await AdminModel.create([document], options);
        return admin[0];
    },
    /**
     * find value
     * @param {*} condition
     * @param {*} projection
     * @param {*} useLean
     * @returns
     */
    findOneAdmin: async (condition, projection) => {
        if (isEmpty(projection)) projection = {};
        let AdminData = await AdminModel.findOne(condition, projection);
        return AdminData;
        // return await ActivityModel.findOne(condition, projection);
    },
    /**
     * find activity
     * @param {*} condition
     * @param {*} projection
     * @param {*} islean
     * @returns
     */
    findAdmin: async (condition, projection, islean = true) => {
        let admin = await AdminModel.find(condition, projection).lean(islean);
        return admin;
    },
    /**
     * update activity
     * @param {*} condition
     * @param {*} projection
     * @returns
     */
    updateAdmin: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await AdminModel.findOneAndUpdate(condition, projection);
    },
    /**
     * delete value
     * @param {*} condition
     * @returns
     */
    deleteAdmim: async (condition) => {
        let options = condition || {};
        return await AdminModel.deleteOne(condition, options);
    }
};

module.exports = AdminQuery;
