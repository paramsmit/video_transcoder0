require("dotenv").config();
const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var ffmpeg = require("fluent-ffmpeg");

// var upload = multer({ dest: 'uploads/' })

app.use(express.static('./views/'))

// cb is error first function
// 3 different times this function should be called
// for 3 different formats

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	cb(null, process.env.FILEPATH)
  },  
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})  

	
// error handling in multer 
// what if file failed to upload 
// if some error occured in ffmpeg command then? 


// file validation

// list of formats
var formats = ['flv','mp4'];
var upload = multer({storage : storage})

app.post('/fileupload', upload.single("filetoupload") , function(req,res,next){
  
   	// if(req.file === undefined) {
   	// 	res.end("please upload the file")
   	// }
   	// else if(req.file.mimetype === 'video/mp4'){
   	// 	res.end("mp4 not supported")   		
   	// }

	  upload(req, res, function (err) {
	    
	  	// console.log(1)

	    if (err instanceof multer.MulterError) {
	    	throw err
	    } else if (err) {
			throw err 
				
	    }	 
		})

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
		.saveToFile(`./uploads/convertedfile.${each_format}`)
	})
})	

app.listen('3000')