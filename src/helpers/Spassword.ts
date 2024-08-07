import bcrypt from "bcrypt";

const Spassword=async (password:string):Promise<string|undefined>=> {

    try {
        if (!password) {
            console.error("Password is required");
            return undefined;
        }

        const spassword:string=await bcrypt.hash(password,10)
        return spassword
        
    } catch (error) {
        
        console.log("error creating sequire password",error);
        return undefined
         
        
    }
    
}

export {
    Spassword
}