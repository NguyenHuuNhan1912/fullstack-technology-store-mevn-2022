const config = {
    app: {
        port: process.env.PORT || 1011 ,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/technology-store"
    }
};

module.exports = config;