var fs = require('fs');

async function readData(err, data) {
    return data;
}

const FileService = {
    readFile: async () => {
        const result = fs.readFileSync('1M-customers.txt', 'utf8', readData);
        return result;
    },

    writeFile: async (fileName, data) => {
        var file = fs.createWriteStream(`${fileName}.txt`)
        for (let i = 0; i < data.length; i++) {
            const obj = Object.values(data[i].dataValues)

            file.write(`${obj} \n`)
        }
    }
};

FileService.name = 'FileService';
module.exports = FileService;
