const config = {
    development: {
        PORT: 5000,
    },
    production: {
        PORT: 5001,
    }
}

const env = process.env.NODE_ENV?.trim() || 'development';

module.exports = config[env];