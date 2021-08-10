const fs = require("fs");

module.exports = function(path,filename){
    const dir = "./uploads";
    // //Get directory of the uploaded folder
    // const filename = fs.readdirSync(dir);
    if (fs.existsSync(path)){
        fs.unlinkSync(dir+"/"+filename);
    }else{
        console.log("Directory not found!");
    }
}