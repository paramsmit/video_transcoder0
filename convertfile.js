const ffmpeg = require("fluent-ffmpeg")
const path = require('path')

// function to convert files to the given format

module.exports = function convertfiles(original_filename, format){
    return new Promise((resolve,reject) => {
        ffmpeg(path.join('./uploads',original_filename))
            .toFormat(format) 
            .on("start", commandLine => {
                console.log(`Spawned Ffmpeg with command: ${commandLine}`);
            })
            .on("error", (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
                reject(err)
            }).save(`./converted_files/convertedfile.${format}`)
            .on("end", (stdout, stderr) => {
                resolve(stdout)
                console.log(stdout, stderr);
            })
    })
} 