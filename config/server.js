var path = require('path');
var jade = require('jade');
var livereload = require('connect-livereload');
var tinylr= require('tiny-lr');
var chokidar = require('chokidar');
var express = require('express');
var debug = require('debug');
var http = require('http');

var ServerManager = {
  as: 'Server',
  inject: ['locals', 'MincerManager', 'BuildConfig'],
  load: function(locals, mincer, config) {
    debug = debug('gulp:server');
    var srcPath = config.srcPath;
    var viewExt = config.viewExt;
    var viewEngine = config.viewEngine;
    var viewsPath = config.viewsPath;
    var port = normalizePort(config.port);

    function run() {
      var app = express();
      extendObj(app.locals, locals);
      app.locals.url = urlify;

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

    function extendObj(obj1, obj2) {
      for (var prop in obj2) {
        if (obj2.hasOwnProperty(prop)) {
          obj1[prop] = obj2[prop];
        }
      }
    }

    function urlify(url) {
      return process.env.NODE_ENV === 'production' ? prodUrlify(url) : devUrlify(url);
    }

    function prodUrlify(url) {
      return url[url.length - 1] === '/' ? url + 'index.html' : url + '.html';
    }

    function devUrlify(url) {
      return url[url.length - 1] === '/' ? url : url + viewExt;
    }

    return {
      run: run
    };
  }
};

module.exports = ServerManager;
