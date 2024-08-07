import  express  from "express";
import { usermodel } from "../models/userModel";
import { Spassword } from "../helpers/Spassword";
import bcrypt from "bcrypt";
import SessionUser from "../helpers/sessions";

 
 
     
declare module 'express-session' {
    interface SessionData {
      user: SessionUser
    }
  }

class userController{




    redirect=async (req:express.Request,res:express.Response) => {
        try {
           
            res.status(200).redirect('/login')
           
        } catch (error) {
            res.status(500).json({ error: error, message: "error from login" });
            
        }
        
    }

    getsigup=async (req:express.Request,res:express.Response) => {
        try {
           
            res.status(200).render('users/signup')
           
        } catch (error) {
            res.status(500).json({ error: error, message: "error from login" });
            
        }
        
    }

    UserSignup=async (req:express.Request,res:express.Response) => {
        try {
           const{name,email,mobile,password}=req.body
           console.log("body",req.body);
           
           const spassword= await Spassword(password)
           console.log("sequire pass",spassword);
           
           const user= await usermodel.create({
            name:name,
            email:email,
            mobile:mobile,
            password:spassword
           })
           await user.save()
           return res.status(200).json({message:"User created ...",data:user})

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }


    getLogin=async (req:express.Request,res:express.Response) => {
        try {
           
            res.status(200).render('users/login')
           
        } catch (error) {
            res.status(500).json({ error: error, message: "error from login" });
            
        }
        
    }


    
    userLogin=async (req:express.Request,res:express.Response) => {
        try {
            // const email=req.query.email
            const{email,password}=req.body

            
            const user=await usermodel.findOne({email:email})

            if (!user) {
              return res.status(400).json({msg:"No user there"})
                
            }
            const passwordMatch= await bcrypt.compare(password,user.password)
            if(!user.isActive)
            {
                return res.status(400).json({msg:'User bloked'})
            }
            if (passwordMatch) {
                req.session.user=user

                console.log(req.session.user);
                
                
                return res.status(200).json({ msg: "success", data: user })
              } else {
                return res.status(400).json({ msg: "Password not match" });
              }

        } catch (error) {
            res.status(500).json({ error: error, msg: "error from login" });
            
        }
        
    }

    getHome=async (req:express.Request,res:express.Response) => {
        try {
            
            const sessionUser=req.session.user as SessionUser
            const name:string=sessionUser.name
            const user=await usermodel.findOne({name:name})
            
            if(sessionUser)
            {
                return res.status(200).render('users/home',{user:user})

            }else
            {
                return res.status(400)
            }

            
           

           
        } catch (error) {
            res.status(500).json({ error: error, message: "error from login" });
            
        }
        
    }

    

    
    getEdit=async (req:express.Request,res:express.Response) => {
        try {
             const username=req.query.name as string
             const user=await usermodel.findOne({name:username})
             if(user)
             {
                console.log("render edit page",user);
                
                res.render('users/edit', { user });
             }else
             {
                
                console.log("error for loading user edit");
                return res.status(400)
                
             }
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }

    EditUser=async (req:express.Request,res:express.Response) => {
        try {
           const{id,name,email,mobile}=req.body
           
           if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
           const user= await usermodel.findById(id)
           if(!user)  return res.status(404).json({ message: "User not found" }) 
          
               user.name=name,
               user.email=email,
               user.mobile=mobile
                
               await user.save()
               req.session.user=user;
            
               return res.status(200).json({message:"User Editedd ...",data:user})
           
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }
    deleteUser=async (req:express.Request,res:express.Response) => {
        try {
           const{id}=req.body

           
           const user= await usermodel.findByIdAndDelete(id)
           if (user) {
            return res.status(200).json({message:"user deleted..."})
            
           }
           return res.status(400).json({message:"user not deleted..."})

          
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }

    userLogout=async (req:express.Request,res:express.Response) => {
        try {
           

            if(req.session.user)
            {
                delete req.session.user;
                return res.redirect('/login'); 
            }else
            
            {
                return res.redirect('/login'); 

            }
           
         
           

          
           

           
        } catch (error) {
            res.status(400).send(error)
            
        }   
    }


    


}
export default new userController();