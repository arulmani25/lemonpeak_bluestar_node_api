const AdminModel = require('../Models/AdminModel');
const MainactivityModel = require('../Models/MainActivityModel');
const UserTypeModel = require('../Models/UserTypeModel');
const RoleModel = require('../Models/RoleModel');
const ActivitiesModel = require('../Models/ActivitiesModel');
const EquipmentModel = require('../Models/EquipmentModel');
const LogoutreasonModel = require('../Models/LogoutreasonModel');
const SublocationModel = require('../Models/SublocationModel');
const FilterModel = require('../Models/FilterModel');
const FiledtypeModel = require('../Models/FiledtypeModel');
const ChecklistValidationModel = require('../Models/ChecklistValidationModel');
const NewequipmentstagModel = require('../Models/NewequipmentstagModel');
const SpareModel = require('../Models/SpareModel');
const TemperaturelogstitleModel = require('../Models/TemperaturelogstitleModel');
const TemperaturelogsFormModel = require('../Models/TemperaturelogsFormModel');
const ChecklistpdftitleModel = require('../Models/ChecklistpdftitleModel');
const Checklist_trackerModel = require('../Models/Checklist_trackerModel');

const seedData = require('./../seed/index');
const { createLogForms } = require('../Helpers/templog');
const { spareSeedFunction } = require('../Helpers/spare');
const { roleSeedFunction } = require('../Helpers/role');

const modelArray = [
    UserTypeModel,
    AdminModel,
    EquipmentModel,
    LogoutreasonModel,
    SublocationModel,
    MainactivityModel,
    FilterModel,
    FiledtypeModel,
    RoleModel,
    ChecklistValidationModel,
    NewequipmentstagModel,
    ActivitiesModel,
    TemperaturelogstitleModel,
    TemperaturelogsFormModel,
    SpareModel,
    ChecklistpdftitleModel,
    Checklist_trackerModel
];

const seedRecordToDB = async () => {
    for (const mod of modelArray) {
        const count = await mod.find({});
        if (count <= 0) {
            switch (mod.collection.collectionName) {
                case 'mainactivities':
                    await mod.insertMany(seedData.mainActivitiesSeedData);
                    break;
                case 'usertypes':
                    await mod.insertMany(seedData.userTypeSeedData);
                    break;
                case 'equipments':
                    await mod.insertMany(seedData.equipmentsSeedData);
                    break;
                case 'logoutreasons':
                    await mod.insertMany(seedData.logoutReasonSeedData);
                    break;
                case 'sublocations':
                    await mod.insertMany(seedData.subLocationSeed);
                    break;
                case 'filters':
                    await mod.insertMany(seedData.filterSeedData);
                    break;
                case 'fieldtypes':
                    await mod.insertMany(seedData.fieldTypeSeed);
                    break;
                case 'roles':
                    await roleSeedFunction();
                    break;
                case 'admins':
                    await mod.insertMany(seedData.adminSeedData);
                    break;
                case 'checklistvalidations':
                    await mod.insertMany(seedData.checklistValidationSeed);
                    break;
                case 'new_equipments':
                    await mod.insertMany(seedData.newEquipmentTags);
                    break;
                case 'activities':
                    await mod.insertMany(seedData.activitiesSeedData);
                    break;
                case 'temperature_logs_titles':
                    await mod.insertMany(seedData.temperatureTitleLogsseed);
                    break;
                case 'temperature_log_forms':
                    await createLogForms();
                    break;
                case 'spares':
                    await spareSeedFunction();
                    break;
                case 'checklist_pdf_titles':
                    await mod.insertMany(seedData.checklistPdfTitleSeed);
                    break;
                case 'checklist_trackers':
                    await mod.insertMany(seedData.checklistTracker);
                    break;
            }

            console.log(`seeding success`);
        }
    }
};

module.exports = { seedRecordToDB };
