const ModelService = require('../services/model.service');
const { Op } = require('sequelize');
const db = require('../models');

const CustomerRepository = {
    getByEmail: async (body) => {
        try {
            let where = {};
            where = { email: body.email };

            const customers = await db.ValidCustomer.findOne({ where: where });
            if (!customers) throw new Error('Customer fetch failed!');

            return customers;
        } catch (error) {
            console.log(error.message)
        }
    },

    getByPhone: async (body) => {
        try {
            let where = {};
            where = { phone: body.phone };

            const customers = await db.ValidCustomer.findOne({ where: where });
            if (!customers) throw new Error('Customer fetch failed!');

            return customers;
        } catch (error) {
            console.log(error.message)
        }
    },

    createVaildCustomer: async (body) => {
        try {
            const customer = await db.ValidCustomer.create(body);
            if (!customer) throw new Error('customer creation failed!');

            return customer;
        } catch (error) {
            console.log(error.message)
        }
    },

    createInvaildCustomer: async (body) => {
        try {
            const customer = await db.InvalidCustomer.create(body);
            if (!customer) throw new Error('customer creation failed!');

            return customer;
        } catch (error) {
            console.log(error.message)
        }
    },

    getVaildCustomer: async () => {
        try {
            const customers = await db.ValidCustomer.findAll();
            if (!customers) throw new Error('customer creation failed!');

            return customers;
        } catch (error) {
            console.log(error.message)
        }
    },

    getInvaildCustomer: async () => {
        try {
            const customers = await db.InvalidCustomer.findAll();
            if (!customers) throw new Error('customer creation failed!');

            return customers;
        } catch (error) {
            console.log(error.message)
        }
    }
};

CustomerRepository.name = 'CustomerRepository';
module.exports = CustomerRepository;
