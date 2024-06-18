const express =require("express");
const bodyParser= require("body-parser");
const mongoose=require("mongoose");
const env=require("dotenv");
const Auth=require('./routes/auth');
const User=require('./routes/userRoute');
const Post=require('./routes/postRoute')
const cors=require("cors");
const UploadRoute=require('./routes/uploadRoute');

env.config();
// const port=5000;

const app = express();

//to serve images for public
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use(cors())
// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log(`Server is running at ${process.env.PORT}`)
    }
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connected to MongoDB')}).catch((err)=>{console.error("Connection error", err)})

//Usage of routes
app.use("/auth", Auth)
app.use("/user",User)
app.use("/post",Post)
app.use("/upload",UploadRoute)