require("dotenv").config();

const express = require('express')
const app = express()
const multer = require('multer')
const {zip} = require('zip-a-folder')
const {removefiles} = require('./removefiles')
const storage = require('./storage')
const convertfile = require('./convertfile')

app.use(express.static('./views/'))

var upload = multer({storage : storage})

app.post('/fileupload', upload.single("filetoupload") , async function(req,res,next){
    
    if(req.file === undefined) {
        res.send("please upload the file")
        return
    }

    // conversion of files in below 3 formats
    try{    
        await convertfile(req.file.originalname,'flv')
        await convertfile(req.file.originalname, 'mp4')
        await convertfile(req.file.originalname, 'asf')
        next()
    }catch(err){
        res.send("invalid input or internal server error")
    }   
})

// zip the converted files to download 
app.post('/fileupload',async function(req,res,next){
    try{
        await zip('./converted_files', './archives/archive.zip')
        next()
    }
    catch(err){
        res.send("internal server error")
    }
})

// download and remove the files in the server directories
app.post('/fileupload', (req,res,next) => {

    try{
        res.download('./archives/archive.zip')
        removefiles('converted_files')
        removefiles('uploads')
        removefiles('archives')
    }catch(e){
        res.send('internal server error')
    }
})

app.listen('3000')