const multer = require('multer')

// storage object of the multer to configure path and file name
// of uploaded files

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.FILEPATH)
    },  
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})  

module.exports = storage