cwb: Cross-Window Broadcasting
===

**cwb** (pronounced *wub*) is a JavaScript library for cross-window
broadcasting and locking.

[![npm][npm-badge]][npm-url]
[![dependencies][dependencies-badge]][dependencies-url]

---

Installation
---

```sh
npm add cwb
```

Usage
---

### Communicating between tabs

#### Subscribe to events

```javascript
import { Channel } from 'cwb'

const chan = new Channel('foo')
chan.on('bar', b => console.log('Got bar:', b))
```

#### Publish events

```javascript
/* In another tab */

const chan = new Channel('foo')
chan.send('bar', 'Porter and Sons')
```

#### Send to the same tab

```javascript
chan.send('bar', 'Porter and Sons', { toSelf: true })
```

### Locking (synchronization)

```javascript
import { lock } from 'cwb'

lock('foo', () => {
    /* Critical section. This function can be async. */
})
```

Changelog
---

**1.0.0**

Migrate to TypeScript

**0.0.3**

New method: `Channel#dispose`

**0.0.2**

New method: `Channel#update`

License
---

MIT

The ObjectId type (a vendored dependency) comes from [bson][bson],
which is licensed under the Apache License 2.0

[npm-badge]: https://img.shields.io/npm/v/cwb.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cwb
[dependencies-badge]: https://img.shields.io/david/mvasilkov/cwb?style=flat
[dependencies-url]: https://www.npmjs.com/package/cwb?activeTab=dependencies
[bson]: https://www.npmjs.com/package/bson
