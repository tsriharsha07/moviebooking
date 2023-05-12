const express=require('express');
const app= express();
const cors=require('cors');
const dotenv=require('dotenv');
const user = require('./routes/user');
const admin = require('./routes/admin');
const movie=require('./routes/movie')
const booking=require('./routes/booking')

dotenv.config({path:'backend/config/config.env'})

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({ limit:"30mb",extended:true}));
app.use(cors());

app.use('/api/v1',user);
app.use('/api/v1',admin);
app.use('/api/v1',movie);
app.use('/api/v1',booking)


module.exports=app