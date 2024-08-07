const SubmitchecklistModel = require('../Models/SubmitchecklistModel');

const collectChecklists = async (equipment_tag_name) => {
    console.log('equipment_tag_name', equipment_tag_name);
    const checklistByMonth = await SubmitchecklistModel.find({
        // check_list_type: { $in: month },
        equipment_tag_name: equipment_tag_name
    });
    return checklistByMonth;
};

module.exports = { collectChecklists };
