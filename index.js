(function() {
    "use strict";
    var cache = {},
        expire = {},
        keys = [],
        UNDEFINED,
        stats = {
            hits: 0,
            misses: 0,
            keys: 0
        },
        iCache = {
            set: function(key, value, ttl, callback) {
                if (typeof ttl === 'function') {
                    callback = ttl;
                    ttl = 3600;
                }
                set('' + key, value, ttl, callback);
            },
            get: get,
            del: del,
            reset: reset,
            stats: function() {
                return {
                    hits: stats.hits,
                    misses: stats.misses,
                    keys: stats.keys
                };
            },
            keys: keys
        };

    function set(key, value, ttl, callback) {
        var rtn;
        if (!cache.hasOwnProperty(key)) {
            stats.keys++;
        }
        cache[key] = JSON.stringify(value);
        rtn = JSON.parse(cache[key]);
        expire[key] = Date.now() + ttl * 1000;
        keys.push(key);
        return callback ? callback(UNDEFINED, rtn) : rtn;
    }

    function get(key, callback) {
        var rtn,
            hit;
        key += '';
        if (cache.hasOwnProperty(key)) {
            if (expire[key] > Date.now() && cache[key] !== UNDEFINED) {
                rtn = JSON.parse(cache[key]);
                hit = true;
            } else {
                expire[key] = UNDEFINED;
                cache[key] = UNDEFINED;
            }
        }
        stats[hit ? 'hits' : 'misses'] ++;

        return callback ? callback(UNDEFINED, rtn) : rtn;
    }

    function clean() {
        if (stats.keys.length < 1e4) {
            return;
        }
        keys.forEach(function(key) {
            if (UNDEFINED === cache[key]) {
                delete expire[key];
                delete cache[key];
            }
        });
    }

    function reset() {
        cache = Object.create(null);
        expire = Object.create(null);
        keys.length = 0;
        stats.keys = 0;
        stats.hits = 0;
        stats.misses = 0;
    }

    function del(key) {
        if (cache.hasOwnProperty(key)) {
            cache[key] = UNDEFINED;
            expire[key] = UNDEFINED;
            stats.keys--;
            keys.splice(keys.indexOf(key), 1);
        }
        clean();
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = iCache;
    } else {
        this.iCache = iCache;
    }
})();