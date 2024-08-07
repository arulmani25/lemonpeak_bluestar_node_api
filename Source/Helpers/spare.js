const ActivitiesModel = require('../Models/ActivitiesModel');
const SpareModel = require('../Models/SpareModel');
const { spareSeedData } = require('../seed/index');

const spareSeedFunction = async () => {
    for (const iterator of spareSeedData) {
        const equipment = await ActivitiesModel.findOne({
            activity_name: iterator.equipment
        });
        const insertRecord = await SpareModel.create({
            equipment: equipment._id,
            equipment_name: iterator.equipment,
            spare_name: iterator.spare
        });
    }
};
module.exports = { spareSeedFunction };
