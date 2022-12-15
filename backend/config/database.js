const mongoose = require("mongoose");
const { mongodbUserUri } = require("../config");


mongoose.connect(`${mongodbUserUri}`).then(() => {
    console.log("connection connected successfully");

}).catch((e) => {
    console.log(`Not Connected ! ${e}`)
})