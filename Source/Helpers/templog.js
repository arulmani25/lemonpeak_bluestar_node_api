const TemperaturelogstitleModel = require('../Models/TemperaturelogstitleModel');
const TemperaturelogsFormModel = require('../Models/TemperaturelogsFormModel');
const seed = require('../seed/index');
const { temperatureLogsTitle } = require('../Utils/enum');

const createLogForms = async () => {
    const getTitleRecord = await TemperaturelogstitleModel.find({});

    for (const record of getTitleRecord) {
        if (record.title === temperatureLogsTitle.LOG_DOM) {
            const data = [];
            for (const iterator of seed.logDomSeedData) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.LOG_INTL) {
            const data = [];
            for (const iterator of seed.logIntlSeedData) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.Daily_Chiller1) {
            const data = [];
            for (const iterator of seed.centriFugalChillersSeed) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.Daily_Chiller2) {
            const data = [];
            for (const iterator of seed.centriFugalChillersSeedOne) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.Daily_Chiller3) {
            const data = [];
            for (const iterator of seed.centriFugalChillersSeedTwo) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.Daily_Chiller4) {
            const data = [];
            for (const iterator of seed.centriFugalChillersSeedThree) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.Domestic_Telecom) {
            const data = [];
            for (const iterator of seed.domesticTelecomRoomTempSeed) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        } else if (record.title === temperatureLogsTitle.International_Telecom) {
            const data = [];
            for (const iterator of seed.intlTeleRoomTempSeed) {
                data.push(iterator);
            }
            await TemperaturelogsFormModel.create({
                titleName: record.title,
                titleId: record._id,
                logs: data
            });
        }
    }
};

module.exports = { createLogForms };
