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
exports.adminAuth = exports.userAuth = void 0;
class UserAuthentication {
    constructor() {
        this.isLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user && req.session.user.isActive === true) {
                    console.log("user session");
                    next();
                }
                else {
                    res.redirect('/login');
                }
            }
            catch (error) {
                console.log("error in Userauth is login", error);
            }
        });
        this.isLogout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user && req.session.user.isActive === true) {
                    res.redirect('/home');
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.log("error in Userauth is logout", error);
            }
        });
    }
}
class AdminAuthentication {
    constructor() {
        this.isLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.admin) {
                    console.log("admin session", req.session.admin);
                    next();
                }
                else {
                    res.redirect('/admin/login');
                }
            }
            catch (error) {
                console.log("error in Userauth is login", error);
            }
        });
        this.isLogout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.admin) {
                    res.redirect('/admin/dashboard');
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.log("error in Userauth is logout", error);
            }
        });
    }
}
exports.userAuth = new UserAuthentication();
exports.adminAuth = new AdminAuthentication();
