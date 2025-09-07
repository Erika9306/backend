const router = require('express').Router();
const {getCourse, getCourses, postCourse, deleteCourse, updateCourse} = require('../../api/controllers/course');
const { isAuth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/file');
const {allowToAdminCourse } = require('../controllers/auth');



router.get('/:id',isAuth, getCourse);
router.get('/',isAuth, getCourses);
router.post('/create',isAuth, upload.single('img'), postCourse);
router.delete('/:id',isAuth, allowToAdminCourse, deleteCourse);
router.put('/:id',isAuth, allowToAdminCourse, upload.single('img'),updateCourse);

module.exports = router;