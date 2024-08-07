import  express  from "express";
import mongoose from "mongoose";
import user from "./routes/user";
import admin from "./routes/admin";
import session from "express-session";
import path from "path";






const app=express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'my_name_is_sujith',
    resave:false,
    saveUninitialized:true,
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));




const MONGO_URL="mongodb://localhost:27017"
mongoose.connect(MONGO_URL,{
    dbName:'Node-TS-CRUD-app'
})
.then(()=>{
    console.log("mongodb connected..");

})
.catch((error)=>{
    console.log("mongo db not connected",error);
})



app.use('/',user)
app.use('/admin',admin)


const port=3000




app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
      
})   