const express =require("express");

const app =express();

const port = 8000;

const path = require('path');

const hbs =require('hbs');

//built in middleware
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


//to set the view engine
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

//template engine route
app.get("",(req,res)=>{
    res.render("index");
});

app.get("/footer",(req,res)=>{
    res.render("footer");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/service",(req,res)=>{
    res.render("service");
});

app.get("/event",(req,res)=>{
    res.render("event");
});

app.get("/photo",(req,res)=>{
    res.render("photo");
});

app.get("/ticket",(req,res)=>{
    res.render("ticket");
});

app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.get("/bootstrap",(req,res)=>{
    res.render("bootstrap");
});

app.get("/js",(req,res)=>{
    res.render("js");
});

app.get("/home",(req,res)=>{
    res.render("home");
});

app.get("*",(req,res)=>{
    res.render("404",{
      errorComment:"oops page couldn't be found ",
    });
});

app.listen(port,()=>{
    console.log(`listining to the port ${port}`);
});