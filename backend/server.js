const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const multer = require('multer')
//const upload = multer({dest:'uploads/'})
const {uploadFile } = require('./s3')
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.get("/getImage", (req, res) => {
    console.log(req)
    res.send("hello")
})
app.post('/uploadImages',async (req,res) => {
    console.log(req);
    res.send("hello")
    const file = req.file
    const result  = await uploadFile(file);
    console.log(result)
    const imagePath = req.files[0].path
    //onst blob = fs.readFileSync(imagePath)
    //const result = await uploadFile(file)
    const description = req.body.description
    res.send("")
})

app.listen(5000, () => console.log("listening on port 5000"))