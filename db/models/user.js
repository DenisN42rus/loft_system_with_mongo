const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcryptjs');

const userSchema = new Schema({
  firstName: String,
  image: String,
  middleName: String,
  permission: {
    chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
  },
  surName: String,
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true
  },
  hash: {
    type: String,
    required: [true, 'Password required']
  },
  refreshToken: {
    type: String
  }
},
{
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.methods.setPassword = function (password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(6), null);
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.hash);
};

const User = mongoose.model('user', userSchema);

const getUserByName = async (username) => {
  return User.findOne({ username });
};

const getUserById = async (id) => {
  return User.findById({ _id: id });
};

const getUsers = async () => {
  return User.find();
};

const createUser = async (data) => {
  const { username, surName, firstName, middleName, password } = data;
  const newUser = new User({
    username: username,
    surName,
    firstName,
    middleName,
    image:
      'https://icons-for-free.com/iconfiles/png/512/profile+user+icon-1320166082804563970.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    }
  });

  newUser.setPassword(password);
  const user = await newUser.save();
  return user;
};

const updateUserPermission = async (id, data) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete({ _id: id });
};

const updateUserProfile = async (id, data) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
};

const updateUserRefreshToken = async (id, data) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
};

module.exports = {
  getUserByName,
  getUserById,
  getUsers,
  createUser,
  updateUserPermission,
  deleteUser,
  updateUserProfile,
  updateUserRefreshToken
};
