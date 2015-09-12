load(require('path'),
     require('jade'),
     require('connect-livereload'),
     require('tiny-lr'),
     require('chokidar'),
     require('express'),
     require('debug'),
     require('http'),
     require('./locals'),
     require('./mincer'),
     require('./config'));

function load(path, jade, livereload, tinylr, chokidar, express, debug, http, locals, mincer, config) {
  debug = debug('gulp:server');
  var srcPath = config.srcPath;
  var viewExt = config.viewExt;
  var viewEngine = config.viewEngine;
  var viewsPath = config.viewsPath;
  var port = normalizePort(config.port);


  exports.run = function run() {
    var app = express();
    locals.load(app.locals, locals.locals);

    app.set('port', port);
    app.engine(viewExt, jade.__express);
    app.set('views', viewsPath);
    app.set('view engine', viewEngine);

    app.use(livereload());
    app.use('/' + config.mountPoint, mincer.server());

    app.get.apply(app, render(app));

    var server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    watch();
  }

  function render(app) {
    return ['(\/|*' + viewExt + ')', function(req, res) {
      if (req.url === '/') {
        res.render('index');
      } else {
        res.render(path.join(viewsPath, req.url));
      }
    }];
  }

  /*
   * Livereload + watcher
   */
  function watch() {
    var reloader = tinylr();
    var watcher = chokidar.watch(srcPath);

    reloader.listen(35729);

    watcher.on('change', function(p) {
      console.log('\nFile', p, 'changed...\n');
      reloader.changed({
        body: { files: [p] }
      });
    });
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    debug('Listening on ' + port);
  }
}
