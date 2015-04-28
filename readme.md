# i-cache

The simplest in-memory cache which store and get objects as pure json structure
Maybe your replacement when u don't have memcached.

## Installation

```bash
$ npm install i-cache
```

## Usage
```js
var iCache = require('i-cache');
```

## API

### Public methods

**iCache.set** cache with the given key.

* `key`: **String** The key
* `value` **Object** The value, will be stored with JSON.stringify
* `lifetime`: **Number** (Optional) After how long should the key expire measured in `seconds`
* `callback`: **Function** (Optional) 

```js
iCache.set('hi', 'Hello World');
```

**iCache.get** get by key.

* `key`: **String** The key
* `callback`: **Function** (Optional) 

```js
var value = iCache.get('hi');//Hello World
```

equals to

```js
iCache.get('hi', function(e, value){
  console.log(value);//Hello World
});
```

**iCache.del** delete by key.
```js
iCache.del('hi');
var value = iCache.get('hi');//undefined
```

**iCache.reset** empty all the caches.
```js
iCache.reset();
```

**iCache.keys** return all the keys of cache objects.
```js
iCache.reset();
iCache.set('hi', 1);
iCache.set('hello', 1);
iCache.keys();//['hi','hello']
```

**iCache.stats** .
```js
var stats = iCache.stats();
/** what stats looks like:
{
  hits: 0,//the number of cache hits
  misses: 0,//the number of cache misses
  keys: 0//the total number of cached keys 
}
**/
```
