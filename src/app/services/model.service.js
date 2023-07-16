'use strict';

const ModelService = {
    /**
     * Get all options of the query/search
     *
     * @example
     * let queryOptions = await ModelService.getQueryOptions(req);
     *
     * @example <caption>distinct = false</caption>
     * Use distinct `false` When there is not any included Model.
     * let queryOptions = await ModelService.getQueryOptions(req, false);
     *
     * @param {Sequelize.Model}     [model] Sequelize Model
     * @param {Object}                 [req] express http request
     * @param {boolean}             [distinct] Use distinct `false` When there is not any included Model.
     * @returns {Promise<{page, limit, offset, order, direction, distinct}>}
     */
    getQueryOptions: async (model, req, distinct = true) => {
        const page = parseInt(req.query.page);
        const limit = +process.env.PAGINATION;
        const offset = (page >= 1) ? parseInt((page - 1) * limit) : 0;
        const order = req.query.order;
        const direction = req.query.direction;
        const show = req.query.show;
        const status = req.query.status;
        const attributes = req.query.fields;

        let queryOptions = {};

        if (distinct) queryOptions.distinct = true;

        if (page >= 1) {
            queryOptions.limit = limit;
            queryOptions.offset = offset;
        }

        if (!page) queryOptions.limit = limit;

        if (status) {
            queryOptions.where = {
                status: status
            }
        }

        if (show === 'all') queryOptions = {};
        if (attributes) queryOptions.attributes = attributes.split(',');

        if (order) {
            let dOrder = direction ? direction : 'asc';
            queryOptions.order = [
                // Sequelize.fn('ISNULL', Sequelize.col(`${model.name}.${order}`)),
                // Sequelize.fn('ISNULL', Sequelize.literal(`Kitab.${order}`)),
                [`${order}`, `${dOrder}`]
            ];
        }

        return queryOptions;
    },

    successResponse: (res, data) => {
        return res.status(200).send({
            data: data
        });
    },

    errorResponse: (res, error) => {
        console.log(error);

        let errorMessage = error.message;
        if (error.errors) {
            try {
                if (error.errors[0].message) errorMessage = error.errors[0].message;
            } catch (err) {
                errorMessage = err.message;
            }
        }

        return res.status(400).send({
            error: errorMessage
        });
    }
};

ModelService.name = 'ModelService';
module.exports = ModelService;
