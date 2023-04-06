//require('dontenv').config()
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3')
//const { GetObjectCommand, S3Client }= require('aws-sdk/client-s3')
const AWS_BUCKET_NAME = ""
const AWS_BUCKET_REGION = ""
const AWS_ACCESS_KEY = ""
const AWS_SECRET_KEY = ""
const bucketName = AWS_BUCKET_NAME
const region = AWS_BUCKET_REGION
const accessKeyId = AWS_ACCESS_KEY
const secretAccessKey = AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
//const client = new S3Client() //

function uploadFile(file) {
    console.log("uploading to S3");
    console.log(file)
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}

function getAllImages() {
    const params = {
        Bucket: bucketName
    }
    return s3.listObjectsV2(params).promise();
}
module.exports = {uploadFile, getAllImages}
//exports.uploadFile = uploadFile