const router = require('express').Router();
const {register, login} = require('../controllers/auth');
const {isAuth} = require('../../middlewares/auth');
const {getUser, getUsers, postUser, deleteUser, updateUser} = require ('../../api/controllers/user');
const { roleAuth } = require('../../middlewares/roleAuth');

router.post("/register", register);
router.post("/login",  login);
router.delete("/:id",  deleteUser);


// Rutas de usuario+
router.get("/:id",  getUser);
router.get("/", isAuth, roleAuth(['user']), getUsers);
router.post("/", postUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", isAuth, deleteUser);

module.exports = router;

