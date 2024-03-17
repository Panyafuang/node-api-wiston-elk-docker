const { format, createLogger, transports } = require("winston");

const path = require('path');

const { combine, timestamp, json, prettyPrint } = format;
const logFile = path.resolve('logs', 'app.log');

console.log('logFile -> ', logFile);


const buildProdLogger = () => {
    return createLogger({
        format: combine(
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            format.errors({ stack: true }), // print out stack trace
            json(),
            prettyPrint()
        ),
        defaultMeta: {
            service: 'user-service'
        },
        transports: [
            new transports.Console(),
            new transports.File({ filename: logFile })
        ],
    });
}


module.exports = buildProdLogger;
