const tokens = require('../libs/tokens');
const User = require('../db/models/user');
const { serializeUser } = require('../libs/serializeUser');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const getProfileCtrl = async (req, res) => {
  const token = req.headers['authorization'];
  const user = await tokens.getUserByToken(token);
  res.json({
    ...serializeUser(user)
  });
};

const patchProfileCtrl = async (req, res, next) => {
  const form = formidable({ multiples: true });
  const token = req.headers['authorization'];
  const user = await tokens.getUserByToken(token);
  const upload = path.join('./build', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    if (files.avatar) {
      if (!files.avatar.name === '' || !files.avatar.size === 0) {
        fs.unlinkSync(files.avatar.path);
        return '';
      }

      const fileName = path.join(upload, files.avatar.name);

      fs.rename(files.avatar.path, fileName, async err => {
        if (err) {
          console.error(err.message);
          return;
        }
        fields.image = fileName.substr(fileName.indexOf('\\'));
        const newUser = await User.updateUserProfile(user._id, fields);
        fs.unlinkSync(path.join(process.cwd(), 'build', user.image));
        res.json({
          ...serializeUser(newUser)
        });
      });
    } else {
      const newUser = await User.updateUserProfile(user._id, fields);
      res.json({
        ...serializeUser(newUser)
      });
    }
  });
};

module.exports = { getProfileCtrl, patchProfileCtrl };
