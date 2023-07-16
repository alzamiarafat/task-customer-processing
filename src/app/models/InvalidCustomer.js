'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class InvaildCustomer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {
            // define association here
        }
    }

    InvaildCustomer.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        zip: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        ip: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        defaultScope: {
            attributes: {
                exclude: ['id', 'created_at', 'updated_at']
            }
        },
        scopes: {
            defaultScope: {},
            exclude: {
                attributes: {
                    exclude: ['id', 'created_at', 'updated_at']
                },
            },
        },
        sequelize,
        tableName: 'invalid_customers',
        modelName: 'InvalidCustomer',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // timestamps: false,
    });
    return InvaildCustomer;
};