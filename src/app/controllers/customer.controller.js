const CustomerService = require("../services/customer.service");

const CustomerController = {
    store: async (req, res, next) => {
        try {
            const result = await CustomerService.store();
            return res.send(result);
        } catch (error) {
            next(error);
        }
    },

    export: async (req, res, next) => {
        try {
            const result = await CustomerService.export();
            return res.send(result);
        } catch (error) {
            next(error);
        }
    }
};

CustomerController.name = 'CustomerController';
module.exports = CustomerController;
