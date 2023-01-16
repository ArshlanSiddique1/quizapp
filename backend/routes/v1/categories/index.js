const { Router } = require("express");
const multer = require('multer');
const router = Router();

const categoryController = require('../../../controllers/categories/categories.controller');

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
router.post('/', userAuth,upload.single('tempImage'),categoryController.register);
router.get('/', categoryController.view);
router.get('/:category_id', categoryController.viewOne);
router.put('/:category_id', userAuth, categoryController.update);
router.patch('/:category_id', userAuth, categoryController.update);
router.delete('/:category_id', userAuth, categoryController.destroy);

module.exports = router;
