const Jimp = require("jimp");
const resizeImg = async (req) => {
  await Jimp.read(`./tmp/${req.file.originalname}`)
    .then((avatar) => {
      return avatar.resize(250, 250).write(`./tmp/${req.file.originalname}`);
    })
    .catch((error) => {
      return error;
    });
};
module.exports = resizeImg;
