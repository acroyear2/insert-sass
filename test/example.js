const first = require("./first.scss")() // calling the function inserts css into <head>

const el = document.createElement("p")
el.innerHTML = "some text"
el.className = first.foo

document.body.appendChild(el)

console.log(first) // { foo: 'test-first_foo_2luu1' } // classname mapping

console.log(document.querySelector("head > style").innerHTML) // css is inserted

const second = require("./second.scss") // not applied yet

console.log(second)
// { [Function: bound ] bar: 'test-second_bar_1geYD' }

console.log(document.querySelector("head > style").innerHTML) // second.scss is not inserted yet

second() // apply now

console.log(document.querySelector("head > style").innerHTML) // second.scss is inserted