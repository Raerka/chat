const winston = require('winston');

// Кау установить переменную окружения???
// const ENV = process.env.NODE_ENV;
const ENV = 'development';

function getLogger(module) {
    var path = module.filename.split('\\').slice(-2).join('\\');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV === 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;