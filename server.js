const express=require('express')
const app=express()
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const authRoutes=require('./routes/auth.js')
const connectDB = require('./config/db');
const adminRoute=require('./routes/admin.js')
const userRoute=require('./routes/user.js')
const voteRoute=require('./routes/vote.js')



// Middleware 
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB();

const PORT=process.env.PORT || 3000

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/admin', adminRoute);
app.use('/api/users',userRoute)
app.use('/api/candidates',voteRoute)



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})  