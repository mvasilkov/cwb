cwb: Cross-Window Broadcasting
===

**cwb** (pronounced *wub*) is a JavaScript library for cross-window broadcasting and locking.

[![npm][npm-image]][npm-url]

---

Installation
---

```sh
yarn add cwb
```

Usage
---

**Communicating between tabs**

```javascript
import { Channel } from 'cwb'

const foochan = new Channel('foo')
foochan.on('bar', b => console.log('Got bar:', b))

/* In another tab: */

const foochan = new Channel('foo')
foochan.send('bar', 'Porter and Sons')

/* Send to the same tab: */

foochan.send('bar', 'Porter and Sons', { toSelf: true })
```

**Locking (synchronization)**

```javascript
import { lock } from 'cwb'

lock('foo', () => {
    /* Critical section. This function can be async. */
})
```

Changelog
---

**0.0.3**

New method: `Channel#dispose`

**0.0.2**

New method: `Channel#update`

License
---

MIT

[bson][bson] (a vendored dependency) is licensed under the Apache License 2.0

[npm-image]: https://img.shields.io/npm/v/cwb.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/cwb
[bson]: https://www.npmjs.com/package/bson
