import express from "express"
import adminController from "../controllers/adminController";
import { adminAuth } from "../middleware/Authentication";

import { Request, Response, NextFunction } from 'express';

const setNoCacheHeaders = (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
const router=express.Router()



router.get('/',adminController.redirect)
router.get('/login',adminAuth.isLogout,setNoCacheHeaders,adminController.getLogin)
router.post('/login',adminAuth.isLogout,setNoCacheHeaders,adminController.adminlogin)
router.get('/logout',adminAuth.isLogin,setNoCacheHeaders,adminController.adminlogout)
router.get('/dashboard',adminAuth.isLogin,setNoCacheHeaders,adminController.getalluser)
router.put('/users/edit',adminAuth.isLogin,adminController.edituser)
router.delete('/user/block',adminAuth.isLogin,adminController.Userblock)
router.delete('/user/unblock',adminAuth.isLogin,adminController.UserUnblock)

export default router; 