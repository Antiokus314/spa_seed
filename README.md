# SPA SEED
This is a complete SPA seed (using gulpjs)

## What does this provide?
* development
  * livereload
  * asset pipeline (using mincer i.e. sprockets syntax)
  * html template pre-processing (any compatible express-js template engine can be used)
  * asset preprocessor (any compatible mincer preprocessor can be used)
* production
  * minified html,css,js (all viewable in the **build** directory: run **gulp build**)
  * gzipped-versioned-tarball (created after running **gulp build; gulp package**)

## tasks

```
tasks
├── assets.task.js
├── build.task.js
├── clean.task.js
├── config.js
├── locals.js
├── mincer.js
├── package.task.js
├── server.js
├── server.task.js
└── views.task.js
```

(anything that ends with \*.task.js in the tasks directory)
* assets
  * builds/minifies the assets(css,js,images) into the build directory with md5 hashes and a manifest.json
* views
  * builds/minifies all html into the build directory
* clean
  * cleans the build dir
* build
  * clean, assets, views
* package
  * creates a gzipped-versioned-tarball (requires the **build** directory to exist first)
* server (default)
  * starts local dev server (with livereload) on port 3000

## directory structure

```
src
├── assets
│   ├── images
│   │   └── minion_banana.jpg
│   ├── javascripts
│   │   └── application.js
│   └── stylesheets
│       ├── application.css
│       └── style.css
└── views
    ├── index.jade
    ├── partials
    │   └── layout.jade
    ├── templates
    └── views
        └── test.jade
```

### src/assets
* images
* javascripts
* stylesheets

### src/views
* index.\*
  * entry point file
* views/\*\*
  * the rest of your views (if you're SPA stops being an SPA)
* partials/\*\*
  * for your utility only. Keep layouts/partials here
* templates/\*\*
  * for your utility only. Keep js templates here

### Using Preprocessors for html/css/js
* For css and js, depending on which preprocessor you use, string interpolation varies. View the [Mincer](http://nodeca.github.com/mincer/) documentation to figure out which to use
* Using an html templating engine is almost necessary here. However, it is certainly possible to use regular html - but you need to use [ejs](https://github.com/tj/ejs) so that the locals can be utilized

## asset_pipeline
The asset load paths are defined in **tasks/config.js**. If you wish to add more paths (especially if you're loading assets from bower) just add the paths you require into the **assetPaths** array. More documentation on [Mincer's Asset Pipeline](http://nodeca.github.com/mincer/)

## locals (tasks/locals.js)
**When using the functions url/css/js remember that the paths are relative (since you're building a static application). This is important because these functions will replace the necessary file asset/url paths with the correct nesting for development/production accordingly**
* url [Function]
  * Necessary for both development and production.
  * For development the server searches the paths specified (relative to the **index.\* **).
  * For a production build it searches and replaces the required paths before converting to html
  * see the sample **index.jade** and **views/test.jade** file for usage
* css [Function]
  * returns a css **link** tag with required css asset
  * Necessary for usage with asset pipeline, requires file extension
  * Can be used in both views and asset files
  * must be utilized with escaped html
  * see the sample **index.jade** and **views/test.jade** file for usage

* js [Function]
  * returns a js **script** tag with required js asset
  * only used for html/view files (requires file extension)
  * must be utilized with escaped html
  * see the sample **index.jade** and **views/test.jade** file for usage

* asset_path
  * can be used in both views and asset files
  * returns the path of the asset file requested (requires file extension)
  * useful for referencing images (which have various different methods of tagging)
  * useful for referencing inside css/js files already (using string interpolation)
