const router = require('express').Router();
const {register, login, allowDeleteUser} = require('../controllers/auth');
const {isAuth} = require('../../middlewares/auth');
const {getUser, getUsers, postUser, deleteUser, updateUser} = require ('../../api/controllers/user');
const { isAdmin } = require('../../middlewares/isAdmin');

router.post("/register", register);
router.post("/login",  login);
router.delete("/:id",  deleteUser);

const auths = [isAuth, allowDeleteUser];

// Rutas de usuario
router.get("/:id", isAuth,getUser);
router.get("/", isAuth, isAdmin, getUsers);
router.post("/",isAuth,upload.single('img'), postUser);
router.put("/:id", isAuth, upload.single('img'), updateUser);
router.delete("/:id", auths, deleteUser);

module.exports = router;

