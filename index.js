'use strict';

var uglify = require('uglify-js');
var _= require('lodash');


function transform(codex, minifyOptions, callback){

    var opts = _.merge({
        fromString: true,   // option to say source is from a string
        compress: true,     // compresses source code
        mangle: false       // by default we don't mangle
    }, minifyOptions);

    var entries = codex.registry;

    // loop through each file we needed to process
    _.forEach(entries, function(entry) {

        // When we build from cache (and it was minified earlier in cache)
        // the `minified` attribute will be set to true and
        // hence we skip minifiying again.
        // If the cached version was not minified, then
        // `minified` will not be true and we ensure we minify the source
        if (entry.minified !== true) {

            // now minify the source!

            // _.cloneDeep:
            // uglify modifies the passed options and that (modified json opts)
            // reflects back into our generated codex JSON.
            // So we pass a cloned object instead
            var minsource = uglify.minify(entry.source,
                _.cloneDeep(opts));

            // save minified source
            entry.source = minsource.code;

            // save the fact that this entry was minified,
            // in subsequent build from cache this flag helps
            // identifying if we need to minify this entry's source or not
            entry.minified = true;
        }
    });

    return callback();
}

module.exports = transform;