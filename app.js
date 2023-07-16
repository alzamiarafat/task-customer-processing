const express = require("express");
const PORT = 3000;
const app = express();

// Route
require('./src/app/routes')(app);

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Server is running on  http://localhost:${PORT}.`);
});