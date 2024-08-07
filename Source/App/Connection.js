const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

const Conection = {
    expressIgniter: (Express) => {
        Express.listen(3012, () => {
            logger.info('server is started on http://localhost:3012');
        });
    }
};

module.exports = Conection;
