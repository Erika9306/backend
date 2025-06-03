const router = require('express').Router();
const {getCourse, getCourses, postCourse, deleteCourse, updateCourse} = require('../../api/controllers/course');
const { upload } = require('../../middlewares/file');



router.get('/:id', getCourse);
router.get('/', getCourses);
router.post('/create', upload.single('img'), postCourse);
router.delete('/:id',  deleteCourse);
router.put('/:id', updateCourse);

module.exports = router;