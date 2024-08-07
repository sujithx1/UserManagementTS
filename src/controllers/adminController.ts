import express from "express";
import { usermodel } from "../models/userModel";




import 'express-session';

declare module 'express-session' {
    interface SessionData {
        admin?: {
            name: string;
            
        };
       
    }
}

type Admin={
    name:string;
    pass:string
}
const admin:Admin={
    name:'admin',
    pass:'admin'
}

class adminController{


    redirect=async (req:express.Request,res:express.Response) => {

        return res.status(200).redirect('admin/login')

        
    }

    getLogin=async (req:express.Request,res:express.Response) => {

        return res.status(200).render('admin/login')

        
    }
    adminlogin=async (req:express.Request,res:express.Response) => {

     try {
        const {email,password}=req.body
        if (email==admin.name) {

            if(password==admin.pass)
            {
                const name=email
                req.session.admin=name
                console.log(req.session.admin);
                
                return res.status(200).json({success:true})
            }else
            {
                return res.status(400).json({msg:"password error"})
            }
            
        }else
        {
            return res.status(400).json({msg:"password and name error"})

        }
        
     } catch (error) {
        res.status(500).json({ error: error, message: "error from login" });
            
        

     }

        
    }

    adminlogout=async (req:express.Request,res:express.Response) => {
        try {
           

            if(req.session.admin)
            {
                delete req.session.admin;
                return res.redirect('/admin/login'); 
            }else
            
            {
                return res.redirect('/admin/login'); 

            }
           
         
           

          
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }


    getalluser=async (req:express.Request,res:express.Response) => {
        try {
            const users=await usermodel.find()
            return res.status(200).render('admin/dashboard',{users})
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }

    edituser=async (req:express.Request,res:express.Response) => {
        try {
            const id=req.query.id as string
           const{name,email,mobile}=req.body
           
           if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
           const user= await usermodel.findById(id)
           if(!user)  return res.status(404).json({ message: "User not found" }) 
          
               user.name=name,
               user.email=email,
               user.mobile=mobile
                
               await user.save()
              
            
               return res.status(200).json({message:"User Editedd ...",data:user})
           
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }

    Userblock=async (req:express.Request,res:express.Response) => {
        try {
           const id=req.query.id as string

           
           const user= await usermodel.findByIdAndUpdate(id,{$set:{isActive:false}},{$new:true})
           if (user  ) {

               if(req.session.user)
               {
                req.session.user.isActive=false
                
               }
            return res.status(200).json({message:"user blocked..."})

            
           }
           return res.status(400).json({message:"user not blocked..."})

          
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }

    UserUnblock=async (req:express.Request,res:express.Response) => {
        try {
           const id=req.query.id as string

           
           const user= await usermodel.findByIdAndUpdate(id,{$set:{isActive:true}},{$new:true})
           if (user) {
            if(req.session.user)
                {
                 req.session.user.isActive=true
                 
                }
            return res.status(200).json({message:"user unblocked..."})
            
           }
           return res.status(400).json({message:"user not unblock..."})

          
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }



    
 


}

export default new adminController()