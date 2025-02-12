var http=require("http")
var fs=require('fs')
var url=require("url")
const { json } = require("stream/consumers")
var server=http.createServer((req,res)=>{
   var parsedurl=url.parse(req.url,true)
  //  console.log(parsedurl.pathname);
   console.log(parsedurl.query.cat);
   
   if(parsedurl.pathname=="/car"&&req.method=="POST"){
    fs.readFile("./cardata.json","utf-8",(err,data)=>{
        if(err){
          res.write(JSON.stringify(err.message))
          res.end()
        }else{
          res.write(data)
          res.end()
        }
    })
   }else if(parsedurl.pathname=="/car"&&req.method=="GET"){
    if(parsedurl.query.cat){
     fs.readFile("./cardata.json","utf-8",(err,data)=>{
      if(err){
        res.write(JSON.stringify(err.message))
        res.end()
      }else{
        var data1=JSON.parse(data)
        console.log(data1);
        if(parsedurl.query.cat=="suv"){
          var cartype1=data1.filter((val)=>{
            return val.carType=="SUV"
          })
          console.log(cartype1);
          
          res.write(JSON.stringify(cartype1))
          res.end()
        }else if(parsedurl.query.cat=="sed"){
          var cartype2=data1.filter((val)=>{
            return val.carType=="Sedan"
          })
          res.write(JSON.stringify(cartype2))
          res.end()
        }else{
          res.write(data)
          res.end()
        }
        
        
      }
     })
    }else{
      res.end("send cat")
    }
   }
   else{
    
   res.write(JSON.stringify({
    msg:"hi resource  not found"
   }))
    res.end()
   }

})




server.listen(3008,()=>{
    console.log("server has been started");
    
})