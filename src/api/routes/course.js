const router = require('express').Router();
const {getCourse, getCourses, postCourse, deleteCourse, updateCourse} = require('../../api/controllers/course');
const { isAuth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/file');



router.get('/:id', getCourse);
router.get('/', getCourses);
router.post('/create', upload.single('img'), postCourse);
router.delete('/:id',isAuth,  deleteCourse);
router.put('/:id', upload.single('img'),updateCourse);

module.exports = router;