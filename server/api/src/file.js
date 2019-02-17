const fs = require('fs');
const s3 = require('../lib/s3');

function upload(file, doctorID, fileType) {
  let s3Path;

  switch (fileType) {
    case 'image':
      s3Path = `tier-one-doctor-videos-images/${doctorID}/${doctorID}-images`;
      break;
    case 'avatar':
      s3Path = `providers/${doctorID}`;
      break;
    case 'videothumb':
      s3Path = `tier-one-doctor-videos-images/${doctorID}/${doctorID}-videos/thumbs`;
      break;
    case 'video':
      s3Path = `tier-one-doctor-videos-images/${doctorID}/${doctorID}-videos`;
      break;
    default:
  }

  const filename = file.path.toString();

  return s3.uploadFile(filename, s3Path)
    .then((res) => {
      fs.unlinkSync(filename);
      return res;
    });
}

module.exports = {
  upload,
};
