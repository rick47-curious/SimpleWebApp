const express = require("express");
const multer = require("multer");
const fs = require("fs");

//Import util class
const delFiles = require("./delFilesUtil");

//Get directory of the uploaded folder
const dir = "./uploads";
const filename = fs.readdirSync(dir);
//we can use date

const storage = multer.diskStorage({
    destination: function(req,res,callback){
        callback(null,'uploads');
    },
    //destructuring the filename with long string
    filename:function(req,file,callback){
        const {originalname} = file;
        callback(null,originalname)
    }
});
//For restoring the filename of the uploaded file
const upload = multer({storage: storage});
//Multer For processing uploaded file
//const upload = multer({dest: 'uploads/'});


//To start a express app
const app = express();

//Refer the form app created in web-form folder
app.use(express.static("web-form"));

app.post('/upload',upload.single('upload_option'),function(req,res){
    delFiles("./uploads",filename);
    return res.json({status:'OK'});
})

app.get('/download',function(req,res){
    const dir = "./uploads";
    //Get directory of the uploaded folder
    const filename = fs.readdirSync(dir);
    const file = "./uploads/"+filename;
    res.download(file);
})
app.listen(3030,function(){
    console.log("App listening...");
})