require("dotenv").config();

const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const zipfolder = require('zip-a-folder')
const fs = require('fs')
const removefiles = require('./removefiles')
const storage = require('./storage')
var ffmpeg = require("fluent-ffmpeg");

app.use(express.static('./views/'))

// list of formats

var formats = ['flv','mp4']
var upload = multer({storage : storage})

app.post('/fileupload', upload.single("filetoupload") , function(req,res,next){
  
    if(req.file === undefined) {
        res.send("please upload the file")
        return
    }

    var promise = new Promise((resolve,reject) => { 
        
        formats.forEach(each_format => {
        
            ffmpeg(path.join('./uploads',req.file.originalname))
                .toFormat(each_format) 
                .on("start", commandLine => {
                    console.log(`Spawned Ffmpeg with command: ${commandLine}`);
                })
                .on("error", (err, stdout, stderr) => {
                    console.log(err, stdout, stderr);
                })
                .on("end", (stdout, stderr) => {
                    console.log(stdout, stderr);
                })
                .saveToFile(`./converted_files/convertedfile.${each_format}`)
        })
    })
    next()
})

// app.post('/fileupload',function(req,res,next){
//     zipfolder.zip('./converted_files', './archives/archive.zip')
//     res.download('./archives/archive.zip')
//     next()  
// })

// app.post('fileupload',(req,res,next) => {
//     removefiles('converted_files')
//     removefiles('uploads') 
// })

app.listen('3000')