const DB_NAME = 'basicmeantest';
const MONGODB_NETWORK_URL = process.env.MONGODB_NETWORK_URL || 'localhost';
const URL = `mongodb://${MONGODB_NETWORK_URL}:27017/${DB_NAME}`;
const BACKUP_URL = `mongodb://localhost:27017/${DB_NAME}`;

module.exports = function (mongoose) {
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
};
