"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
require("express-session");
const admin = {
    name: 'admin',
    pass: 'admin'
};
class adminController {
    constructor() {
        this.redirect = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).redirect('admin/login');
        });
        this.getLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).render('admin/login');
        });
        this.adminlogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (email == admin.name) {
                    if (password == admin.pass) {
                        const name = email;
                        req.session.admin = name;
                        console.log(req.session.admin);
                        return res.status(200).json({ success: true });
                    }
                    else {
                        return res.status(400).json({ msg: "password error" });
                    }
                }
                else {
                    return res.status(400).json({ msg: "password and name error" });
                }
            }
            catch (error) {
                res.status(500).json({ error: error, message: "error from login" });
            }
        });
        this.adminlogout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.admin) {
                    delete req.session.admin;
                    return res.redirect('/admin/login');
                }
                else {
                    return res.redirect('/admin/login');
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.getalluser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.usermodel.find();
                return res.status(200).render('admin/dashboard', { users });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.edituser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const { name, email, mobile } = req.body;
                if (!id) {
                    return res.status(400).json({ message: "User ID is required" });
                }
                const user = yield userModel_1.usermodel.findById(id);
                if (!user)
                    return res.status(404).json({ message: "User not found" });
                user.name = name,
                    user.email = email,
                    user.mobile = mobile;
                yield user.save();
                return res.status(200).json({ message: "User Editedd ...", data: user });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.Userblock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const user = yield userModel_1.usermodel.findByIdAndUpdate(id, { $set: { isActive: false } }, { $new: true });
                if (user) {
                    if (req.session.user) {
                        req.session.user.isActive = false;
                    }
                    return res.status(200).json({ message: "user blocked..." });
                }
                return res.status(400).json({ message: "user not blocked..." });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.UserUnblock = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const user = yield userModel_1.usermodel.findByIdAndUpdate(id, { $set: { isActive: true } }, { $new: true });
                if (user) {
                    if (req.session.user) {
                        req.session.user.isActive = true;
                    }
                    return res.status(200).json({ message: "user unblocked..." });
                }
                return res.status(400).json({ message: "user not unblock..." });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = new adminController();
