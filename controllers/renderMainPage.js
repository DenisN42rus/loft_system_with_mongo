const path = require('path');

const renderMainPageCtrl = (req, res) => {
  const file = path.resolve(process.cwd(), 'build', 'index.html');
  res.sendFile(file);
};

module.exports = renderMainPageCtrl;
