# insert-sass

a browserify transform for inserting sass

```
npm install insert-sass
```

# example

[`first.scss`](./test/first.scss)

```scss
body {
	background-color: gray;
}

.foo {
	color: yellow;
	font-size: 64px;
	font-family: sans-serif;
}
```

[`second.scss`](./test/second.scss)

```scss
.bar {
    color: green;
}
```

[`example.js`](./test/example.js)

```js
const foo = require("./first.scss")() // calling the function inserts css into <head>

const el = document.createElement("p")
el.innerHTML = "some text"
el.className = styles.foo

document.body.appendChild(el)

console.log(styles) // { foo: 'test-first_foo_2luu1' } // classname mapping

console.log(document.querySelector("head > style").innerHTML) // css is inserted

const otherStyles = require("./second.scss") // not applied yet

console.log(otherStyles) // { [Function: bound ] bar: 'test-second_bar_1geYD' }

console.log(document.querySelector("head > style").innerHTML) // second.scss is not inserted yet

otherStyles() // apply now

console.log(document.querySelector("head > style").innerHTML) // second.scss is inserted
```
