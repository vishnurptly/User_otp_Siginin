const mongoose = require('mongoose');

const googleSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  profilePic: String,
});
const GoogleLog = mongoose.model('googlelog', googleSchema);
module.exports =GoogleLog;
