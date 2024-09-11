/*global require, process*/

require('dotenv').config();
const app = require('./src/app');

//start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
