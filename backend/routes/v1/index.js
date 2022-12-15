const { Router } = require('express');
const router = Router();


const userRouter = require('./users');
const categoryRouter = require('./categories');
const sectorsRouter = require('./sectors');
const subjectsRouter = require('./subjects');
const gradesRouter = require('./grades');
const sectionsRouter = require('./sections');
const questionsRouter = require('./questions');



router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/sectors', sectorsRouter);
router.use('/subjects', subjectsRouter);
router.use('/grades', gradesRouter);
router.use('/sections', sectionsRouter);
router.use('/questions', questionsRouter);

module.exports = router;