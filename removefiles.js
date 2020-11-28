const fs = require('fs')
const path = require('path')

// function to remove files from the directory 

function removefiles(directory){
    fs.readdir(directory, (err, files) => {
        if (err) throw err  
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err
            })
        }
    })
}

module.exports.removefiles = removefiles