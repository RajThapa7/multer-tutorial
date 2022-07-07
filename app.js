const express = require('express');
const multer = require('multer');

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images')
    },
    filename: (req, file, cb)=>{
        cb( null, Date.now() + '--' + file.originalname);
    }
})
const upload = multer({storage: fileStorageEngine})


app.use(express.static('public'))
app.post('/single', upload.single('image'), (req, res)=>{
    console.log(req.file);
    res.send("File upload successful")
})  

app.post('/multi', upload.array('images', 3), (req, res)=>{
    console.log(req.files);
    res.send("Multiple File upload successful")

})  

app.listen(5000, ()=>{
    console.log('Your app is listening on port 5000');
})