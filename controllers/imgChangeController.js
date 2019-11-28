//IMPORT THE MODEL WE CREATED EARLIER
var User = require('../models/usuario');
//IMPORT CLOUDINARY CONFIG HERE
var cloud = require('../config/cloudinary');


module.exports = function (req, res, next) {
  var imageDetails = {
    cloudImage: req.files[0].path,
  }
  cloud.uploads(imageDetails.cloudImage).then((result) => {
    var imageDetails = {
      cloudImage: result.url,
      imageId: result.id
    }
    User.update(
      { foto: imageDetails.cloudImage },
      { where: req.user.id }
    )
      .then(function (rowsUpdated) {
        res.json(rowsUpdated)
      })
      .catch(next)
  })
}
