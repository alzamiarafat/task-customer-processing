'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const nodeEnv = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);

// commerceDb should be available in second place // it user for transaction
const configs = {
    'config': require('../../config/config')[nodeEnv]
}

const databases = Object.keys(configs);
const db = {};

//configs serial and folders serial should be same
const folders = [
    `${__dirname}`
]

let connections = [];

for (let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = configs[database];
    connections.push(new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath))
}

for (let i = 0; i < folders.length; i++) {
    fs.readdirSync(folders[i])
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
        })
        .forEach(file => {
            const modelName = file.split('.')[0];
            const model = require(path.join(folders[i], file))(connections[i], DataTypes, modelName)
            db[model.name] = model;
        });
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db['dbConnection'] = connections[0]

module.exports = db;
