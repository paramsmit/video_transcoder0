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

    // convertfile(req.file.originalname, 'flv').then(
    //     result=>convertfile(req.file.originalname,'mp4').then(result=>next())
    // )   

    await convertfile(req.file.originalname,'flv')
    await convertfile(req.file.originalname, 'mp4')
    next()
})

app.post('/fileupload',async function(req,res,next){
    await zip('./converted_files', './archives/archive.zip')
    // lock logic 
    next()
})


app.post('/fileupload', (req,res,next)=>{

    removefiles('converted_files')
    removefiles('uploads')
    res.download('./archives/archive.zip')

})

app.listen('3000')