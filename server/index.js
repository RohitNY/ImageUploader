const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const moment  = require('moment');

const upload = multer({
    dest: 'uploads/'
})

const {
    uploadFile,
    getAllImages
} = require('./s3')

const {generateUID} = require('./helper');

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.get("/getImage", (req, res) => {
    console.log(req)
    res.send("hello")
})


app.post('/uploadImages', upload.any(), async (req, res) => {
    const file = req.files[0];
    console.log(generateUID)
    file.filename = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '');
    file.filename = `${generateUID()}_${file.filename}`;
    const result = await uploadFile(file);
    res.send(result)
})


app.get('/getImages', async (req, res) => {

    const imagesData = await getAllImages();
    //console.log(imagesData)
    const contents = imagesData?.Contents ?? [];
    
    const allImages = contents.reduce((result, data) => {
        const updatedData = {
            Name: data.Key,
            Created: moment(data.LastModified).format('MMM-DD-YYYY'),
            Url: `https://${imagesData.Name}.s3.amazonaws.com/${data.Key}`,
            Preview: `https://${imagesData.Name}.s3.amazonaws.com/${data.Key}`,
        };
        result.push(updatedData)
        return result;
    }, []);
console.log(allImages)
    res.send(allImages);
})

app.listen(8080, () => console.log("listening on port 8080"))