var fs = require("fs");
var cloudinary = require("cloudinary").v2;
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

cloudinary.config({
  cloud_name: 'ste0219',
  api_key: '882961265275991',
  api_secret: 'GdDeecOsde62ogsJxABZUF9A1zs'
});

router.post("/", multipartMiddleware, function (req, res) {
  let filename = req.files.dataFile.path; cloudinary.uploader.upload(filename, { tags: "gotemps", resource_type: "auto" })
    .then(function (file) {
      console.log("Public id of the file is  " + file.public_id); console.log("Url of the file is  " + file.url);
      /* Below variable template is part of my project and I have removed some of the unnecessary code so instead of template use whatever fits your situation */
      template.dataFile = file.url;  //save the url to your model                            
      template.save(); //save the model as you have changed it                                 
      res.redirect("/templates");
    })
    .catch(function (err) {
      if (err) {
        console.warn(err);
      }
    }); res.redirect("/templates");
}
);
