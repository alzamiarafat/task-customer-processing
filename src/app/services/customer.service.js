const CustomerRepository = require("../repositories/customer.repository");
const FileService = require("./file.service");

const phoneValidation = (phoneNo) => {
    const regex = /^\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^\d{10}$|^1\s\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^(1\s?)?\(\d{3}\)(\s|\-)?\d{3}\-\d{4}$/;
    return phoneNo.match(regex);
}

const CustomerService = {
    store: async () => {
        let response = await FileService.readFile()
        let singleLineData;
        let result = [];

        // Line wise split
        singleLineData = response.split('\r\n');

        // ',' wise split of a single line
        for (let i = 0; i < singleLineData.length; i++) {
            let specificValue = singleLineData[i].split(',');
            result.push(specificValue);
        }

        let fieldName = ['first_name', 'last_name', 'state', 'country', 'zip', 'phone', 'email', 'ip'];
        let data = []
        for (let i = 0; i < result.length; i++) {
            let obj = {}
            for (let j = 0; j < result[i].length; j++) {
                obj[fieldName[j]] = result[i][j]
            }
            data.push(obj)
        }

        for (let i = 0; i < data.length; i++) {
            const existCustomerGetByEmail = await CustomerRepository.getByEmail(data[i]);
            const existCustomerGetByPhone = await CustomerRepository.getByPhone(data[i]);
            const phoneValidationCheck = phoneValidation(data[i].phone);
            if (phoneValidationCheck == null || existCustomerGetByEmail || existCustomerGetByPhone) {
                await CustomerRepository.createInvaildCustomer(data[i]);
            } else {
                await CustomerRepository.createVaildCustomer(data[i]);
            }
        }

        return { 'count': result.length, result };
    },

    export: async () => {
        const validCustomer = await CustomerRepository.getVaildCustomer();
        const invalidCustomer = await CustomerRepository.getInvaildCustomer();

        await FileService.writeFile('valid-customers', validCustomer);
        await FileService.writeFile('invalid-customers', invalidCustomer);

        return 'Success';
    }
};

CustomerService.name = 'CustomerService';
module.exports = CustomerService;
