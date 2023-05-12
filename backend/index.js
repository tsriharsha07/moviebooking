const app=require('./app');

const connectToDatabase=require('./config/db');
const dotenv = require('dotenv')

connectToDatabase();

dotenv.config({path:'backend/config/config.env'})


app.get('/',(req,res)=>{
    res.send('This is a movie booking application')
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server listening on PORT:${process.env.PORT}`)}
)