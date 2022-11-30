require('dotenv').config()
const express = require("express");
const app = express();
const ejs = require('ejs')
// const server = require('http').createServer(app)
// const io = require('socket.io')(server,{cors:{origin:'*'}});
const socket = require('socket.io');
app.set("view engine","ejs")
app.use(express.static('public'))
app.get("/home",(req,res)=>{
    res.render("home");
})
const server = app.listen(process.env.PORT,()=>{
    console.log("Server is running at port",process.env.PORT);
})
const io = socket(server);
io.on('connection',function(socket){
console.log(socket.id);
    socket.on("chat",function(data){
        io.sockets.emit("chat",data)
    });
    socket.on("typing",function(data){
        socket.broadcast.emit("typing",data)
    })
})