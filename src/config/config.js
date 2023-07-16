require('dotenv').config('../../.env');
const env = process.env

module.exports = {
    development: {
        username: env.COMMERCE_DB_USER,
        password: env.COMMERCE_DB_PASSWORD,
        database: env.COMMERCE_DB,
        host: env.COMMERCE_HOST,
        port: env.COMMERCE_PORT,
        dialect: env.COMMERCE_DIALECT,
        logging: false,
        define: {
            underscored: true
        }
    },
    staging: {
        username: env.COMMERCE_DB_USER,
        password: env.COMMERCE_DB_PASSWORD,
        database: env.COMMERCE_DB,
        host: env.COMMERCE_HOST,
        port: env.COMMERCE_PORT,
        dialect: env.COMMERCE_DIALECT,
        logging: false,
        define: {
            underscored: true
        }
    },
    production: {
        username: env.COMMERCE_DB_USER,
        password: env.COMMERCE_DB_PASSWORD,
        database: env.COMMERCE_DB,
        host: env.COMMERCE_HOST,
        port: env.COMMERCE_PORT,
        dialect: env.COMMERCE_DIALECT,
        logging: false,
        define: {
            underscored: true
        }
    }
}
