const router = require('express').Router();
const {register, login} = require('../controllers/auth');
const {isAuth} = require('../../middlewares/auth');
const {getUser, getUsers, postUser, deleteUser, updateUser} = require ('../../api/controllers/user');
const { roleAuth } = require('../../middlewares/isAdmin');

router.post("/register", register);
router.post("/login",  login);
router.delete("/:id",  deleteUser);

const auths = [isAuth, roleAuth];

// Rutas de usuario
router.get("/:id",  getUser);
router.get("/", isAuth, getUsers);
router.post("/", postUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", auths, deleteUser);

module.exports = router;

