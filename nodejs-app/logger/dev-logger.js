const { format, createLogger, transports } = require("winston");
const { printf, combine, timestamp } = format;


const buildDevLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            format.errors({ stack: true }), // print out stack trace
            logFormat
        ),
        transports: [new transports.Console()],
    });
}


module.exports = buildDevLogger;
