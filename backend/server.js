const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
require("./config/database");
const { host, port, PRIVATE_KEY } = require('./config');
const routes = require("./routes");
const multer = require('multer');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// API Routes
app.use(express.static('public'))
app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('server working');
})


app.listen(port, () => {
    console.log(`Connection Connected at - host: ${host} port: ${port}`);
})
