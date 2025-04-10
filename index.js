const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())
const db = require('./db/db')
const userRoute = require('./routes/auth_user')
app.use('/api/user/',userRoute)
const chanterRoute = require('./routes/chanter_route')
app.use('/api/chanter/',chanterRoute)
app.listen(port,async()=>{
    console.log('connected');  
    await db.connectDb()
})
require('dotenv').config();


