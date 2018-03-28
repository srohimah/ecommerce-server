const Storage = require('@google-cloud/storage');
const config = {
  CLOUD_BUCKET: 'ecommerce-image.srohimah.com',
  PROJECT_ID: 'first-deploy-198005'
}

// prepare storage
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'first-deploy-b6d4d20ae6ea.json'
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// the real middleware
function sendUploadToGCS (req, res, next) {
 
  if (!req.file) {
    return next('upload mungkin gagal');
  }

  const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
  const file = bucket.file(gcsname);

  // prepare the stream
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  console.log("----",gcsname)
  // handle when upload error
  stream.on('error', (err) => {
    console.log("errrr======")
    req.file.cloudStorageError = err;
    next(err); 
  });

  // handle when upload finish
  stream.on('finish', () => {
    console.log('streamm,,.........')
    req.file.cloudStorageObject = gcsname;
    file.makePublic(). //make the uploaded file public
      then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
  });

  // write the file
  stream.end(req.file.buffer);
}

module.exports = {
  sendUploadToGCS
};