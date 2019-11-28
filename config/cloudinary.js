var cloudinary = require("cloudinary").v2;
var multipart = require("connect-multiparty");

cloudinary.config({
  cloud_name: 'ste0219',
  api_key: '882961265275991',
  api_secret: 'GdDeecOsde62ogsJxABZUF9A1zs'
});

exports.uploads = (file) =>{
  return new Promise(resolve => {
  cloudinary.uploader.upload(file, (result) =>{
  resolve({url: result.url, id: result.public_id})
  }, {resource_type: "auto"})
  })
  }