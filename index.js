var path = require('path')
var through = require('through2')
var sass = require('node-sass')
var css = require('css-loader')

module.exports = function(file, opts) {
  if ('.scss' !== path.extname(file)) {
	  return through()
  }

  if (!opts) opts = {}

  var s = '';
  return through(function(row, enc, cb) {
    s += row.toString()
    cb()
  }, function (cb) {
    var self = this

	if (opts.normalizeImports) {
		s = s.replace(/@import ([\"\'])(\.{1,2}\/)*/g, '@import $1')
	}

    opts.data = s

    sass.render(opts, function(err, res) {
      if (err) {
        console.error(err)
        cb()
      } else {

        function next (err, result) {
            if (err) {
				console.error(err)
			} else {
                result = result.replace(/exports = module\.exports.*/g, 'function d(x) { return require("insert-css")(x[1]) }')
                result = result.replace(/exports\.push/g, 'd')

                if (/exports\.locals \=/g.test(result)) {
                    result = result.replace(/exports\.locals \=/g, 'return')
                } else {
                    var xid = path.basename(file).split('.')[0];
                    result += 'return { "' + xid + '": "' + xid + '"};'
                }

                result = 'module.exports=(function(){\n' + result + '\n})()'

                self.push(result)
            }
            s = ''; cb()
        }

        var ctx = {
            async: function () {
                return next
            },
            callback: next,
            options: { context: '' },
            resource: file,
            resourcePath: file,
            loaders: [ { request: '/path/css-loader' } ],
            emitError: function(message) {
                throw new Error(message);
            }
        }

		ctx.query = '?module&localIdentName=[path][name]---[local]---[hash:base64:5]'

        if (opts.query)
            ctx.query = opts.query

        css.call(ctx, res.css.toString())
      }
    })
  })
}
