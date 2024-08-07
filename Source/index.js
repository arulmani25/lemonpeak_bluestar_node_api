const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'production'}`)
});
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const responseMiddleware = require('./Middlewares/response.middleware');


const { cronJob } = require('./Helpers/cron');

const { errorHandler } = require('./Middlewares/errorhandler');
const NewequipmentstagModel = require('./Models/NewequipmentstagModel');
const EquipmentModel = require('./Models/EquipmentModel');
const ChecklistValidationModel = require('./Models/ChecklistValidationModel');
const DocumentModel = require('./Models/DocumentModel');
const ChecklistpdftitleModel = require('./Models/ChecklistpdftitleModel');
const fs = require('fs');
const { temp } = require('./Utils/html_to_pdf');
const { collectChecklists } = require('./Utils/collectChecklist');
const app = express();

const corsOption = {
    origin: '*'
};

// Middleware
app.use(fileUpload());
app.use(responseMiddleware);
app.use(cors(corsOption));
app.use(compression());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser setup
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization'
    );
    next();
});

console.log(process.env.NODE_ENV);
console.log('BASE_URL', process.env.BASE_URL);
console.log('DataBase URL', process.env.MONGO_CONNECTION_STRING);

// Routes setup (Add your routes here)
app.use('/api', express.static(path.join(__dirname)));
app.use('/api', express.static(path.join(__dirname, 'Source/assets')));

//run cron

cronJob();

//delete uploaded file

app.post('/deletefile', (req, res, next) => {
    try {
        const { filePath } = req.body;
        if (!fs.existsSync(`${filePath}`)) {
            return res.json({
                message: 'Path Not Exist',
                status: 'Failure',
                code: 404
            });
        }
        fs.unlinkSync(`${filePath}`);
        return res.json({
            message: 'File Deleted Successfully',
            status: 'Success',
            code: 200
        });
    } catch (error) {
        console.log(error);
    }
});
//error handler
app.use(errorHandler);

//qrcode
const Buffer = require('buffer').Buffer;

app.post('/qr', async (req, res) => {
    try {
        const data = await NewequipmentstagModel.find({});

        for (const iterator of data) {
            console.log('iterator', iterator.cobie_tag);
            console.log('iteratorcode', iterator.qrcode);
            if (iterator.qrcode) {
                const imageBuffer = Buffer.from(iterator.qrcode?.split('base64,')[1], 'base64');
                fs.writeFileSync(
                    `/home/developer/Documents/arulmani/resource/bluestar/qrcode/${iterator.cobie_tag}.png`,
                    imageBuffer,
                    (err) => {
                        if (err) {
                            console.error('Error:', err);
                        } else {
                            console.log('Image successfully saved.');
                        }
                    }
                );
            }
        }
        return res.json({ message: 'convertion finished' });
    } catch (error) {
        console.log(error);
    }
});

app.post('/qrupdate', async (req, res) => {
    const record = await NewequipmentstagModel.find({});

    for (const iterator of record) {
        await EquipmentModel.findOneAndUpdate(
            { equipment_tag: iterator.equipment_tag },
            { $set: { qrcode: iterator.qrcode, cobie_tag: iterator.cobie_tag } }
        );
        await ChecklistValidationModel.findOneAndUpdate(
            { equipment_tag: iterator.equipment_tag },
            { $set: { cobie_tag: iterator.cobie_tag } }
        );
    }

    return res.json({ message: 'success' });
});

app.post('/pdf', async (req, res) => {
    try {
        const { equipment_tag_name } = req.body;
        const file_paths = [];

        const isAlreadyDownloaded = await DocumentModel.findOne({
            tag_name: equipment_tag_name
        });
        if (isAlreadyDownloaded) {
            return res.json({
                Status: 'Success',
                Message: 'File Already Downloaded',
                Data: [],
                Code: 400
            });
        }
        const checklistData = await collectChecklists(equipment_tag_name);

        const getTypeByCobieCode = await ChecklistValidationModel.findOne(
            {
                cobie_tag: equipment_tag_name
            },
            {},
            { type: 1 }
        );

        const getTitle = await ChecklistpdftitleModel.findOne({
            type: getTypeByCobieCode.type
        });
        console.log('getTitle', getTitle);

        const data = await temp(checklistData[0], getTitle.title);
        console.log('data', data);
        file_paths.push(data);
        console.log('file_path', file_paths);
        await DocumentModel.create({
            path: file_paths[0],
            tag_name: file_paths[0].split('/upload/')[1].split('.')[0],
            checklist_date: checklistData[0].createdAt
        });
        return res.json({
            Status: 'Success',
            Message: 'File path',
            Data: file_paths,
            Code: 200
        });
    } catch (err) {
        console.log(err);
    }
});

//check app version

app.get('/getlatest_version', async function (req, res) {
    try {
        return res.json({
            Status: 'Success',
            Message: 'Version',
            Data: {
                version: '27-05-24-01',
                apk_link: `http://34.212.35.112:3000/api/upload/BLUE_STAR_27-05-24-01.apk`
            },
            Code: 200
        });
    } catch (error) {
        console.log(error);
    }
});
// 404 handler
app.use((req, res) => {
    res.status(404).end('Page Not Found');
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).render('error');
});

/**-----DataBase Connection------------ */
require('./Models/MultiConnection').establish(app);

/**----------------------------------------------------------------------------- */

app.use('/api/admin', require('./Routes/AdminRoutes'));
app.use('/api/activity', require('./Routes/ActivityRoutes'));
// app.use('/api/user', require('./Routes/UserRoutes'));
// app.use('/api/mainactivity', require('./Routes/MainActivityRoutes'));
// app.use('/api/subactivity', require('./Routes/SubactivityRoutes'));
// app.use('/api/checklist', require('./Routes/ChecklistRoutes'));
// app.use('/api/mobile', require('./Routes/MobileRoutes'));
// app.use('/api/usertype', require('./Routes/UsertypeRoutes'));
// app.use('/api/role', require('./Routes/RoleRoutes'));
// app.use('/api/equipment', require('./Routes/EquipmentRoutes'));
// app.use('/api/jobs', require('./Routes/JobsRoutes'));
// app.use('/api/temp', require('./Routes/TempRoutes'));
// app.use('/api/location', require('./Routes/LocationRoutes'));
// app.use('/api/sublocation', require('./Routes/SublocationRoutes'));
// app.use('/api/upload', require('./Routes/UploadRoutes'));
// app.use('/api/spare', require('./Routes/SpareRoutes'));
// app.use('/api/reports', require('./Routes/ReportsRoutes'));
// app.use('/api/temperatureform', require('./Routes/TemperatureformRoutes'));

/**--------------------------------------------------------------------------- */
const { CronTemperatureLogForm } = require('./Helpers/TemperatureLogFormCron');
CronTemperatureLogForm();
/**------------------------------------------------------------------------------ */

module.exports = app;
