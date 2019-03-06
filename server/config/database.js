const DB_NAME = 'basicmeantest';

const PERSISTENCE_MONGODB = 'mongodb';
const supportedPersistenceTypes = new Set(['mongodb']);
const PERSISTENCE_TYPE = process.env.PERSISTENCE_TYPE || null;

const MONGODB_NETWORK_URL = process.env.MONGODB_NETWORK_URL || 'localhost';
const URL = `mongodb://${MONGODB_NETWORK_URL}:27017/${DB_NAME}`;
const BACKUP_URL = `mongodb://localhost:27017/${DB_NAME}`;

const logger = require('../library/Utilities/logger.js');

module.exports = function (mongoose) {
    if (!supportedPersistenceTypes.has(PERSISTENCE_TYPE) || PERSISTENCE_TYPE !== PERSISTENCE_MONGODB) {
        logger.warn('No persistence specified! So none used.');
    } else {
        logger.warn('Connecting to mongodb.');
        mongoose.connect(URL, function(err) {
            if (err) {
                console.log("mongoose connection failed! Using backup connection.");
                mongoose.connect(BACKUP_URL, function (err) {
                    if (err) {
                        console.log("backup connection failed!");
                        console.error(err);
                    } else {
                        console.log(`connected to mongodb on ${BACKUP_URL}`);
                    }
                });
            } else {
                console.log(`connected to mongodb on ${URL}`);
            }
        });
    }
};
