const test = require("tape")
const browserify = require("browserify")
const vm = require("vm")
const jsdom = require("jsdom")

test("example", t => {
    const b = browserify(__dirname + "/example.js")
    b.transform(require("../"))
    b.bundle((er, src) => {
        t.error(er)

        jsdom.env("<head />", (err, window) => {
            vm.runInNewContext(src, {
                console: { log: log },
                document: window.document
            })
        })

        t.plan(6)

        var j = -1, i = -1

        const expected = [
            function(x) {
                t.ok(x.hasOwnProperty("foo"))
            },
            function(x) {
                j = x
                t.ok(x.length > 15)
            },
            function(x) {
                t.ok(x.hasOwnProperty("bar"))
            },
            function(x) {
                t.ok(x === j)
            },
            function(x) {
                t.notOk(x === j)
            }
        ]

        function log(x) {
            expected[++i](x)
        }
    })
})

// test("insert-sass", t => {
//     const b = browserify(__dirname + "/inject.js")
//     b.transform(require("../"))
//     b.bundle((er, src) => {
//         t.error(er)

//         console.log(src.toString())

//         jsdom.env("<head />", (err, window) => {
//             vm.runInNewContext(src, {
//                 console: { log: log },
//                 document: window.document
//             })
//         })

//         function log(msg) {
//             console.log(msg)
//             t.end()
//         }
//     })
// })