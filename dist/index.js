"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'my_name_is_sujith',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
const MONGO_URL = "mongodb://localhost:27017";
mongoose_1.default.connect(MONGO_URL, {
    dbName: 'Node-TS-CRUD-app'
})
    .then(() => {
    console.log("mongodb connected..");
})
    .catch((error) => {
    console.log("mongo db not connected", error);
});
app.use('/', user_1.default);
app.use('/admin', admin_1.default);
const port = 3000;
// app.get('/',(req,res)=>{
//     res.send("hellow , typescript with express hai iam sujtih")    
// })
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
