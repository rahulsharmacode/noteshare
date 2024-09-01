const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("database connected");
}).catch((err)=> {
    console.log(`database failed to connect, Error : ${err}`)
});