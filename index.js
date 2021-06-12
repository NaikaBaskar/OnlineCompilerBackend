const express = require("express")
const cors=require("cors")
var axios=require('axios')

const main=require('./main')
 
const app=express()

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())
require('dotenv').config();



app.post('/run',async (req,res)=>{
    const {language="cpp",code,input=""}=req.body;
    console.log(language);
    console.log(req.body)
    var data=JSON.stringify({"code":req.body.code,"language":req.body.language,"input":""})
    let result = await main.compile(code, input, language);

        if (result.status === 0) {
            console.log("error while compiling the code");
            return res.status(200).json({statusCode:0,err:"error while compiling the code",data:result.final})
         
        }
        else if (result.status === 1) {
            console.log("compiled with errors in code");
            return res.status(200).json({statusCode:1,err:"error while running the code",data:result.final})
         
        }
        else if (result.status === 2) {
            console.log("--------------successfully compile---------------");
            console.log(result.final);
            let result2 = await main.run(code, input, language);
            console.log(result2)
            if (result2.status === 0) {
                console.log("error while running the code");
                
                return res.status(200).json({statusCode:2,err:"error while running the code",data:result2.final})
            }
            else if (result2.status === 1) {
                console.log("run with errors in code");
                console.log(result2.err)
               
                return res.status(200).json({statusCode:3,err:"run with errors in code",data:result2.final})
            }
            else {
                console.log("-------------------successfully run---------------------");
                console.log(result2.final);
                return res.status(200).json({statusCode:4,err:"successfully run",data:result2.final})
            
            }
        }
    
   
})



app.listen(process.env.PORT || 5000,()=>{
    console.log("Listening at 5000")
})




 