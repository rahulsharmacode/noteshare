const cors = require('cors');
const express = require("express");
require("./db/config")
const app = express();
const userRouter = require("./routers/index.router");
app.use(express.json());
app.use(cors());
app.use(userRouter);

app.get('/' , (req,res) => {
    res.status(200).json({message : "success" , data : "server test ok" , ip : req.ip });
});


app.listen(process.env.PORT , () => {
    console.log(`server running at port ${process.env.PORT}`)
})