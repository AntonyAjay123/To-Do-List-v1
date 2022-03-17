//jshint esversion:6

const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let day="";
let itemVal="";

let items=[];
let workItems=[];

let options={weekday:'long',year:'numeric',month:'long',day:'numeric'};

app.get("/",function(req,res){
  var today=new Date();
  let day=today.toLocaleDateString("en-US",options);
  res.render('list',{kindOfDay:day, nextItemToDo:items});
});

app.post("/",function(req,res){
  itemVal=req.body.nextItem;
  if(req.body.button=="Work"){
    workItems.push(itemVal);
    res.redirect("/work");
  }else{
  items.push(itemVal);
  res.redirect("/");
}
});

app.get("/work",function(req,res){
  res.render("list",{kindOfDay:"Work List",nextItemToDo:workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});

app.post("/work",function(req,res){
  let itemVal=req.body.nextItem;
  workItems.push(itemVal);
  res.redirect("/work");
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
