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
app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('server working');
})

// // Multer Codes --------------------------------------------------------------------------------------------
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, Date.now() + '_' + file.originalname)
//     }
// })
// const upload = multer({ storage: storage });


// router.post('/images', upload.single('tempImage'), (req, res) => {
//     if (!req.file) {
//         res.send({ code: 500, msg: 'error' })
//     } else {
//         var file_name = req.file.filename;
//         res.send({ code: 200, msg: 'Upload Success', name: file_name })
//     }
// });




app.listen(port, () => {
    console.log(`Connection Connected at - host: ${host} port: ${port}`);
})
