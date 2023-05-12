const mongoose=require('mongoose');

const connectToDatabase = ()=>{
    mongoose.set("strictQuery", false);
    
    
    mongoose.connect("mongodb://127.0.0.1/movie-booking",({
            useNewUrlParser: true,
            useUnifiedTopology: true 
    })).then(con =>{
        console.log(`Mongodb Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports=connectToDatabase;