var LocalsManager = {
  inject: ['locals', 'pkg'],
  load: function(locals, pkg) {
    locals.title = pkg.name;
    locals.url = urlify;
    /**
     * Add your locals here!
     */












    /**
     * Don't modify this unless you know what you're doing
     */
    function urlify(url) {
      return process.env.NODE_ENV === 'production' ? prodUrlify(url) : devUrlify(url);
    }

    function prodUrlify(url) {
      return url[url.length - 1] === '/' ? url + 'index.html' : url + '.html';
    }

    function devUrlify(url) {
      return url[url.length - 1] === '/' ? url : url + viewExt;
    }
  }
};

module.exports = LocalsManager;
