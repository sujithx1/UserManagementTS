import express from "express";
import userController from "../controllers/userController";
import { userAuth } from "../middleware/Authentication";


import { Request, Response, NextFunction } from 'express';

const setNoCacheHeaders = (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
const router=express.Router()
router.get('/',userController.redirect)
router.get('/signup',userAuth.isLogout, userController.getsigup)
router.post('/signup',userAuth.isLogout,userController.UserSignup)
router.get('/login',userAuth.isLogout,setNoCacheHeaders,userController.getLogin)
router.post('/login',userAuth.isLogout,setNoCacheHeaders,userController.userLogin)
router.get('/home',userAuth.isLogin,setNoCacheHeaders,userController.getHome)
router.get('/logout',userAuth.isLogin,setNoCacheHeaders,userController.userLogout)
// router.get('/users',userController.getalluser)  
router.get('/edit',userAuth.isLogin,userController.getEdit)
router.put('/edit',userAuth.isLogin,userController.EditUser)
router.delete('/delete',userAuth.isLogin,userController.deleteUser)



export default router;