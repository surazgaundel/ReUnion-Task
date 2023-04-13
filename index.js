const express = require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const postRoute=require('./routes/posts');



//connect to db
mongoose.connect(process.env.DB_CONNECT,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log('Error connecting to MongoDB'))

app.use(express.json())

app.set('view engine', 'ejs');

//import auth
const authRoute=require('./routes/auth');

//auth middleware
app.use('/api',authRoute)
app.use('/api/posts',postRoute);


const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{console.log('listening on port',PORT)})