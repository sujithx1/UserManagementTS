import express from "express"
class UserAuthentication {
    isLogin=async (req:express.Request,res:express.Response,next:express.NextFunction) => {
       try {
        if(req.session.user &&req.session.user.isActive ===true)
            {
                console.log("user session");
                
                next()
            }else
            {
                res.redirect('/login')
            }
        
       } catch (error) {
        console.log("error in Userauth is login",error);
        
        
       }
        
    }
    isLogout=async (req:express.Request,res:express.Response,next:express.NextFunction) => {
       try {
        if(req.session.user &&req.session.user.isActive ===true)
            {
               res.redirect('/home')
            }else
            {
                next();
            }
        
       } catch (error) { 
        console.log("error in Userauth is logout",error);
        
       }
        
    }
   
    
}

class AdminAuthentication{

    isLogin=async (req:express.Request,res:express.Response,next:express.NextFunction) => {
        try {
         if(req.session.admin)
             {
                console.log("admin session",req.session.admin);
                
                 next()
             }else
             {
                  res.redirect('/admin/login')
             }
         
        } catch (error) {
         console.log("error in Userauth is login",error);
         
         
        }
         
     }
     isLogout=async (req:express.Request,res:express.Response,next:express.NextFunction) => {
        try {
         if(req.session.admin)
             {
                res.redirect('/admin/dashboard')
             }else
             {
next()
             }
         
        } catch (error) {
         console.log("error in Userauth is logout",error);
         
        }
         
     }

}
export const userAuth= new  UserAuthentication() ; 
export const adminAuth =new AdminAuthentication();

    
     




    