"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.get('/signup', userController_1.default.getsigup);
router.post('/signup', userController_1.default.UserSignup);
router.get('/login', userController_1.default.getLogin);
router.post('/login', userController_1.default.userLogin);
router.get('/home', userController_1.default.getHome);
router.get('/users', userController_1.default.getalluser);
router.get('/edit', userController_1.default.getEdit);
router.put('/edit', userController_1.default.EditUser);
router.delete('/delete', userController_1.default.deleteUser);
exports.default = router;
