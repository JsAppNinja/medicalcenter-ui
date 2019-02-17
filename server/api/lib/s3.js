const AWS = require('aws-sdk');
const fs = require('fs');
const uniqid = require('uniqid');
const mime = require('mime-types');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function uploadFile(filePath, s3Path, predefinedId) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, body) => {
      if (err) {
        reject(err);
        return;
      }

      const contentType = mime.contentType(filePath);
      const ext = path.extname(filePath);
      const id = predefinedId || uniqid();
      const key = `${s3Path}/${id}${ext}`;

      s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ACL: 'public-read',
        Body: body,
        ContentType: contentType,
      }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({ url: `${process.env.AWS_S3_URL}/${key}` });
      });
    });
  });
}

module.exports = {
  uploadFile,
};
