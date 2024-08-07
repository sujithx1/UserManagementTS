"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const Authentication_1 = require("../middleware/Authentication");
const setNoCacheHeaders = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
const router = express_1.default.Router();
router.get('/', userController_1.default.redirect);
router.get('/signup', Authentication_1.userAuth.isLogout, userController_1.default.getsigup);
router.post('/signup', Authentication_1.userAuth.isLogout, userController_1.default.UserSignup);
router.get('/login', Authentication_1.userAuth.isLogout, setNoCacheHeaders, userController_1.default.getLogin);
router.post('/login', Authentication_1.userAuth.isLogout, setNoCacheHeaders, userController_1.default.userLogin);
router.get('/home', Authentication_1.userAuth.isLogin, setNoCacheHeaders, userController_1.default.getHome);
router.get('/logout', Authentication_1.userAuth.isLogin, setNoCacheHeaders, userController_1.default.userLogout);
// router.get('/users',userController.getalluser)  
router.get('/edit', Authentication_1.userAuth.isLogin, userController_1.default.getEdit);
router.put('/edit', Authentication_1.userAuth.isLogin, userController_1.default.EditUser);
router.delete('/delete', Authentication_1.userAuth.isLogin, userController_1.default.deleteUser);
exports.default = router;
