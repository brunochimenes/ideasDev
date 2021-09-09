const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ideasDev', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;