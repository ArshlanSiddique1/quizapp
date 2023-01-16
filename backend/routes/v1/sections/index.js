const { Router } = require('express');
const router = Router();
const multer = require('multer');


const sectionsController = require('../../../controllers/sections/sections.controller');
// Route Level Middleware - To Protect Route
const userAuth = require("../../../middleware/auth-middleware");

// Multer Codes --------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage });

router.post('/images', upload.single('tempImage'), (req, res) => {
    if (!req.file) {
        console.log("multer")
        res.send({ code: 500, msg: 'error' })
    } else {
        var file_name = req.file.filename;
        console.log(file_name)
        res.send({ code: 200, msg: 'Upload Success', name: file_name })
    }
});

// Public Routes
router.post('/', userAuth, upload.single('tempImage'),sectionsController.register);
router.get('/', sectionsController.view);
router.get('/:section_id', sectionsController.viewOne);
router.put('/:section_id', userAuth, sectionsController.update);
router.patch('/:section_id', userAuth, sectionsController.update);
router.delete('/:section_id', userAuth, sectionsController.destroy);

module.exports = router;