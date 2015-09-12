var path = require('path');

var srcPath = path.join(__dirname, '..', 'src');
var buildPath = path.join(__dirname, '..', 'build');

module.exports = {
  srcPath: srcPath,
  buildPath: buildPath,

  viewExt: '.jade',
  viewEngine: 'jade',
  viewsPath: path.join(srcPath, 'views'),

  port: process.env.PORT || 3000,

  assetBuildPath: path.join(buildPath, 'assets'),
  assetCompilation: ['(**/*|application).(js|css)', '(**/*|*).(jpg|png|svg|gif)'],
  assetPaths: [
    'src/assets/images',
    'src/assets/javascripts',
    'src/assets/stylesheets'
  ],
  assetMacroProcessor: ['.js', '.css', '.scss'],
  mountPoint: 'assets'
}

