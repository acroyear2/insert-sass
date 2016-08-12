const styles = require('./x.scss')

const el = document.createElement('p')
el.innerHTML = "some text"
el.className = styles.foo

document.body.appendChild(el)