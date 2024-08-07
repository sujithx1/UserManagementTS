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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const Spassword_1 = require("../helpers/Spassword");
const bcrypt_1 = __importDefault(require("bcrypt"));
class userController {
    constructor() {
        this.redirect = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).redirect('/login');
            }
            catch (error) {
                res.status(500).json({ error: error, message: "error from login" });
            }
        });
        this.getsigup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).render('users/signup');
            }
            catch (error) {
                res.status(500).json({ error: error, message: "error from login" });
            }
        });
        this.UserSignup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, password } = req.body;
                console.log("body", req.body);
                const spassword = yield (0, Spassword_1.Spassword)(password);
                console.log("sequire pass", spassword);
                const user = yield userModel_1.usermodel.create({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: spassword
                });
                yield user.save();
                return res.status(200).json({ message: "User created ...", data: user });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.getLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).render('users/login');
            }
            catch (error) {
                res.status(500).json({ error: error, message: "error from login" });
            }
        });
        this.userLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const email=req.query.email
                const { email, password } = req.body;
                const user = yield userModel_1.usermodel.findOne({ email: email });
                if (!user) {
                    return res.status(400).json({ msg: "No user there" });
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!user.isActive) {
                    return res.status(400).json({ msg: 'User bloked' });
                }
                if (passwordMatch) {
                    req.session.user = user;
                    console.log(req.session.user);
                    return res.status(200).json({ msg: "success", data: user });
                }
                else {
                    return res.status(400).json({ msg: "Password not match" });
                }
            }
            catch (error) {
                res.status(500).json({ error: error, msg: "error from login" });
            }
        });
        this.getHome = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionUser = req.session.user;
                const name = sessionUser.name;
                const user = yield userModel_1.usermodel.findOne({ name: name });
                if (sessionUser) {
                    return res.status(200).render('users/home', { user: user });
                }
                else {
                    return res.status(400);
                }
            }
            catch (error) {
                res.status(500).json({ error: error, message: "error from login" });
            }
        });
        this.getEdit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.query.name;
                const user = yield userModel_1.usermodel.findOne({ name: username });
                if (user) {
                    console.log("render edit page", user);
                    res.render('users/edit', { user });
                }
                else {
                    console.log("error for loading user edit");
                    return res.status(400);
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.EditUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, mobile } = req.body;
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
                req.session.user = user;
                return res.status(200).json({ message: "User Editedd ...", data: user });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const user = yield userModel_1.usermodel.findByIdAndDelete(id);
                if (user) {
                    return res.status(200).json({ message: "user deleted..." });
                }
                return res.status(400).json({ message: "user not deleted..." });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.userLogout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user) {
                    delete req.session.user;
                    return res.redirect('/login');
                }
                else {
                    return res.redirect('/login');
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = new userController();
