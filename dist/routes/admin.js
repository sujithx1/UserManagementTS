"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const Authentication_1 = require("../middleware/Authentication");
const setNoCacheHeaders = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
const router = express_1.default.Router();
router.get('/', adminController_1.default.redirect);
router.get('/login', Authentication_1.adminAuth.isLogout, setNoCacheHeaders, adminController_1.default.getLogin);
router.post('/login', Authentication_1.adminAuth.isLogout, setNoCacheHeaders, adminController_1.default.adminlogin);
router.get('/logout', Authentication_1.adminAuth.isLogin, setNoCacheHeaders, adminController_1.default.adminlogout);
router.get('/dashboard', Authentication_1.adminAuth.isLogin, setNoCacheHeaders, adminController_1.default.getalluser);
router.put('/users/edit', Authentication_1.adminAuth.isLogin, adminController_1.default.edituser);
router.delete('/user/block', Authentication_1.adminAuth.isLogin, adminController_1.default.Userblock);
router.delete('/user/unblock', Authentication_1.adminAuth.isLogin, adminController_1.default.UserUnblock);
exports.default = router;
