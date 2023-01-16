const { Router } = require('express');
const router = Router();
const multer = require('multer');


const gradesController = require('../../../controllers/grades/grades.controller');
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
router.post('/',userAuth,gradesController.register);
router.get('/', gradesController.view);
router.get('/:grade_id', gradesController.viewOne);
router.put('/:grade_id', userAuth, gradesController.update);
router.patch('/:grade_id', userAuth, gradesController.update);
router.delete('/:grade_id', userAuth, gradesController.destroy);

module.exports = router;