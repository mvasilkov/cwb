!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.cwb=e():t.cwb=e()}(window,(function(){return t={909:(t,e,r)=>{"use strict";const n=r(851).Buffer,i=(0,r(47).randomBytes)(5),o=new RegExp("^[0-9a-fA-F]{24}$");let s=!1;try{n&&n.from&&(s=!0)}catch(t){s=!1}const u=[];for(let t=0;t<256;t++)u[t]=(t<=15?"0":"")+t.toString(16);const f=[];let a=0;for(;a<10;)f[48+a]=a++;for(;a<16;)f[55+a]=f[87+a]=a++;const h=n;function c(t,e){const r=t[e];return new TypeError(`ObjectId string "${t}" contains invalid character "${r}" with character code (${t.charCodeAt(e)}). All character codes for a non-hex string must be less than 256.`)}class l{constructor(t){if(t instanceof l)return t;if(null==t||"number"==typeof t)return this.id=l.generate(t),void(l.cacheHexString&&(this.__id=this.toString("hex")));const e=l.isValid(t);if(!e&&null!=t)throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");if(e&&"string"==typeof t&&24===t.length&&s)return new l(n.from(t,"hex"));if(e&&"string"==typeof t&&24===t.length)return l.createFromHexString(t);if(null==t||12!==t.length){if(null!=t&&t.toHexString)return l.createFromHexString(t.toHexString());throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")}this.id=t,l.cacheHexString&&(this.__id=this.toString("hex"))}toHexString(){if(l.cacheHexString&&this.__id)return this.__id;let t="";if(!this.id||!this.id.length)throw new TypeError("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is ["+JSON.stringify(this.id)+"]");if(this.id instanceof h)return t=this.id.toString("hex"),l.cacheHexString&&(this.__id=t),t;for(let e=0;e<this.id.length;e++){const r=u[this.id.charCodeAt(e)];if("string"!=typeof r)throw c(this.id,e);t+=r}return l.cacheHexString&&(this.__id=t),t}static getInc(){return l.index=(l.index+1)%16777215}static generate(t){"number"!=typeof t&&(t=~~(Date.now()/1e3));const e=l.getInc(),r=n.alloc(12);return r[3]=255&t,r[2]=t>>8&255,r[1]=t>>16&255,r[0]=t>>24&255,r[4]=i[0],r[5]=i[1],r[6]=i[2],r[7]=i[3],r[8]=i[4],r[11]=255&e,r[10]=e>>8&255,r[9]=e>>16&255,r}toString(t){return this.id&&this.id.copy?this.id.toString("string"==typeof t?t:"hex"):this.toHexString()}toJSON(){return this.toHexString()}equals(t){return t instanceof l?this.toString()===t.toString():"string"==typeof t&&l.isValid(t)&&12===t.length&&this.id instanceof h?t===this.id.toString("binary"):"string"==typeof t&&l.isValid(t)&&24===t.length?t.toLowerCase()===this.toHexString():"string"==typeof t&&l.isValid(t)&&12===t.length?t===this.id:!(null==t||!(t instanceof l||t.toHexString))&&t.toHexString()===this.toHexString()}getTimestamp(){const t=new Date,e=this.id.readUInt32BE(0);return t.setTime(1e3*Math.floor(e)),t}static createPk(){return new l}static createFromTime(t){const e=n.from([0,0,0,0,0,0,0,0,0,0,0,0]);return e[3]=255&t,e[2]=t>>8&255,e[1]=t>>16&255,e[0]=t>>24&255,new l(e)}static createFromHexString(t){if(void 0===t||null!=t&&24!==t.length)throw new TypeError("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");if(s)return new l(n.from(t,"hex"));const e=new h(12);let r=0,i=0;for(;i<24;)e[r++]=f[t.charCodeAt(i++)]<<4|f[t.charCodeAt(i++)];return new l(e)}static isValid(t){return null!=t&&("number"==typeof t||("string"==typeof t?12===t.length||24===t.length&&o.test(t):t instanceof l||t instanceof h&&12===t.length||!!t.toHexString&&(12===t.id.length||24===t.id.length&&o.test(t.id))))}toExtendedJSON(){return this.toHexString?{$oid:this.toHexString()}:{$oid:this.toString("hex")}}static fromExtendedJSON(t){return new l(t.$oid)}}Object.defineProperty(l.prototype,"generationTime",{enumerable:!0,get:function(){return this.id[3]|this.id[2]<<8|this.id[1]<<16|this.id[0]<<24},set:function(t){this.id[3]=255&t,this.id[2]=t>>8&255,this.id[1]=t>>16&255,this.id[0]=t>>24&255}}),l.prototype[Symbol.for("nodejs.util.inspect.custom")]=l.prototype.toString,l.index=~~(16777215*Math.random()),Object.defineProperty(l.prototype,"_bsontype",{value:"ObjectID"}),t.exports=l},47:t=>{"use strict";let e=function(t){const e=new Uint8Array(t);for(let r=0;r<t;++r)e[r]=Math.floor(256*Math.random());return e};"undefined"!=typeof window&&window.crypto&&window.crypto.getRandomValues&&(e=t=>window.crypto.getRandomValues(new Uint8Array(t))),t.exports={randomBytes:e}},252:function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=n(r(143));e.EventEmitter=i.default;const o=n(r(909));e.ObjectId=o.default;const s=r(457);e.sleep=s.sleep,e.lock=s.lock;const u=Object.create(null);class f extends i.default{constructor(t,e=64,r=6e4){if(super(),this.onstorage=t=>{if(t.key==`⭕️${this.key}`&&t.newValue&&t.storageArea==localStorage)try{this.queueConsume(JSON.parse(t.newValue))}catch(t){console.error(`Channel(${this.key}): localStorage went bad`)}},this.cleanup=async()=>{this.disposed||(await s.lock(this.key,()=>{const t=Math.floor(.001*(Date.now()-this.queueTTL)),e=this.queueLoad().filter(e=>new o.default(e.pk).generationTime>=t);this.seenEvents=new Set(e.filter(t=>this.seenEvents.has(t.pk)).map(t=>t.pk)),this.queueSave(e)}),s.sleep(this.queueTTL).then(this.cleanup))},u[t])return u[t];var n;this.key=t,this.queueSize=e,this.queueTTL=r,this.seenEvents=new Set,this.started=Math.floor(.001*Date.now()),this.disposed=!1,addEventListener("storage",this.onstorage),s.sleep((n=this.queueTTL,Math.floor(.5*n*(Math.random()+1)))).then(this.cleanup),u[t]=this}send(t,e,r={}){var n;Array.isArray(e)||(e=[e]);const i=null!=(n=r.pk)?n:(new o.default).toString();return this.seenEvents.add(i),r.toSelf&&this.trigger(t,e),s.lock(this.key,()=>{const r=this.queueLoad();for(r.push({pk:i,event:t,args:e});r.length>this.queueSize;)this.seenEvents.delete(r.shift().pk);this.queueSave(r)})}update(){this.queueConsume(this.queueLoad())}dispose(){this.disposed=!0,removeEventListener("storage",this.onstorage),delete u[this.key]}queueLoad(){try{return JSON.parse(localStorage.getItem(`⭕️${this.key}`)||"[]")}catch(t){return[]}}queueSave(t){try{localStorage.setItem(`⭕️${this.key}`,JSON.stringify(t))}catch(t){console.error(`Channel(${this.key}): localStorage went bad`)}}queueConsume(t){t.forEach(t=>{this.seenEvents.has(t.pk)||(this.seenEvents.add(t.pk),new o.default(t.pk).generationTime<this.started||this.trigger(t.event,t.args))})}}e.Channel=f,e.default=f},457:function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=n(r(909));async function o(t,r,n=9e3){const o=(new i.default).toString();let s=Date.now();const u=e=>localStorage.getItem(`❌${t}.${e}`),f=(e,r)=>localStorage.setItem(`❌${t}.${e}`,r),a=async r=>{await e.sleep(),Date.now()-s>n&&(s=Date.now(),console.error(`lock(${t}): clearing the stalled variable ${r}`),f(r,""))};return await async function t(){for(f("X",o);u("Y");)await a("Y");if(f("Y",o),u("X")!=o){if(await e.sleep(48),u("Y")!=o)return await t();for(;u("Z");)await a("Z")}else f("Z","1");const n=await r();return f("Z",""),u("Y")==o&&f("Y",""),n}()}e.sleep=t=>new Promise(e=>setTimeout(e,t)),e.lock=o,e.default=o},717:(t,e)=>{"use strict";e.byteLength=function(t){var e=f(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,o=f(t),s=o[0],u=o[1],a=new i(function(t,e,r){return 3*(e+r)/4-r}(0,s,u)),h=0,c=u>0?s-4:s;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],a[h++]=e>>16&255,a[h++]=e>>8&255,a[h++]=255&e;return 2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,a[h++]=255&e),1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,a[h++]=e>>8&255,a[h++]=255&e),a},e.fromByteArray=function(t){for(var e,n=t.length,i=n%3,o=[],s=0,u=n-i;s<u;s+=16383)o.push(a(t,s,s+16383>u?u:s+16383));return 1===i?(e=t[n-1],o.push(r[e>>2]+r[e<<4&63]+"==")):2===i&&(e=(t[n-2]<<8)+t[n-1],o.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),o.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0,u=o.length;s<u;++s)r[s]=o[s],n[o.charCodeAt(s)]=s;function f(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function a(t,e,n){for(var i,o,s=[],u=e;u<n;u+=3)i=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),s.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return s.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},851:(t,e,r)=>{"use strict";var n=r(717),i=r(350),o="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function s(t){if(t>2147483647)throw new RangeError('The value "'+t+'" is invalid for option "size"');var e=new Uint8Array(t);return Object.setPrototypeOf(e,u.prototype),e}function u(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return h(t)}return f(t,e,r)}function f(t,e,r){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);var r=0|p(t,e),n=s(r),i=n.write(t,e);return i!==r&&(n=n.slice(0,i)),n}(t,e);if(ArrayBuffer.isView(t))return c(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(H(t,ArrayBuffer)||t&&H(t.buffer,ArrayBuffer))return function(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,u.prototype),n}(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return u.from(n,e,r);var i=function(t){if(u.isBuffer(t)){var e=0|l(t.length),r=s(e);return 0===r.length?r:(t.copy(r,0,0,e),r)}return void 0!==t.length?"number"!=typeof t.length||N(t.length)?s(0):c(t):"Buffer"===t.type&&Array.isArray(t.data)?c(t.data):void 0}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function h(t){return a(t),s(t<0?0:0|l(t))}function c(t){for(var e=t.length<0?0:0|l(t.length),r=s(e),n=0;n<e;n+=1)r[n]=255&t[n];return r}function l(t){if(t>=2147483647)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+2147483647..toString(16)+" bytes");return 0|t}function p(t,e){if(u.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||H(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return j(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return P(t).length;default:if(i)return n?-1:j(t).length;e=(""+e).toLowerCase(),i=!0}}function g(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return T(this,e,r);case"utf8":case"utf-8":return B(this,e,r);case"ascii":return L(this,e,r);case"latin1":case"binary":return O(this,e,r);case"base64":return x(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function y(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function d(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),N(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:w(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):w(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function w(t,e,r,n,i){var o,s=1,u=t.length,f=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,u/=2,f/=2,r/=2}function a(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){var h=-1;for(o=r;o<u;o++)if(a(t,o)===a(e,-1===h?0:o-h)){if(-1===h&&(h=o),o-h+1===f)return h*s}else-1!==h&&(o-=o-h),h=-1}else for(r+f>u&&(r=u-f),o=r;o>=0;o--){for(var c=!0,l=0;l<f;l++)if(a(t,o+l)!==a(e,l)){c=!1;break}if(c)return o}return-1}function v(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;n>o/2&&(n=o/2);for(var s=0;s<n;++s){var u=parseInt(e.substr(2*s,2),16);if(N(u))return s;t[r+s]=u}return s}function m(t,e,r,n){return q(j(e,t.length-r),t,r,n)}function b(t,e,r,n){return q(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function E(t,e,r,n){return b(t,e,r,n)}function A(t,e,r,n){return q(P(e),t,r,n)}function S(t,e,r,n){return q(function(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function x(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function B(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,s,u,f,a=t[i],h=null,c=a>239?4:a>223?3:a>191?2:1;if(i+c<=r)switch(c){case 1:a<128&&(h=a);break;case 2:128==(192&(o=t[i+1]))&&(f=(31&a)<<6|63&o)>127&&(h=f);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(f=(15&a)<<12|(63&o)<<6|63&s)>2047&&(f<55296||f>57343)&&(h=f);break;case 4:o=t[i+1],s=t[i+2],u=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&u)&&(f=(15&a)<<18|(63&o)<<12|(63&s)<<6|63&u)>65535&&f<1114112&&(h=f)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=c}return function(t){var e=t.length;if(e<=4096)return String.fromCharCode.apply(String,t);for(var r="",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=4096));return r}(n)}function L(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function O(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function T(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=$[t[o]];return i}function I(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function U(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function _(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function C(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function R(t,e,r,n,o){return e=+e,r>>>=0,o||C(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function k(t,e,r,n,o){return e=+e,r>>>=0,o||C(t,0,r,8),i.write(t,e,r,n,52,8),r+8}e.Buffer=u,e.SlowBuffer=function(t){return+t!=t&&(t=0),u.alloc(+t)},e.INSPECT_MAX_BYTES=50,e.kMaxLength=2147483647,u.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),u.poolSize=8192,u.from=function(t,e,r){return f(t,e,r)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(t,e,r){return function(t,e,r){return a(t),t<=0?s(t):void 0!==e?"string"==typeof r?s(t).fill(e,r):s(t).fill(e):s(t)}(t,e,r)},u.allocUnsafe=function(t){return h(t)},u.allocUnsafeSlow=function(t){return h(t)},u.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u.prototype},u.compare=function(t,e){if(H(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),H(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=u.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var o=t[r];if(H(o,Uint8Array)&&(o=u.from(o)),!u.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},u.byteLength=p,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},u.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},u.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},u.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):g.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},o&&(u.prototype[o]=u.prototype.inspect),u.prototype.compare=function(t,e,r,n,i){if(H(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0),f=Math.min(o,s),a=this.slice(n,i),h=t.slice(e,r),c=0;c<f;++c)if(a[c]!==h[c]){o=a[c],s=h[c];break}return o<s?-1:s<o?1:0},u.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return d(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return d(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return v(this,t,e,r);case"utf8":case"utf-8":return m(this,t,e,r);case"ascii":return b(this,t,e,r);case"latin1":case"binary":return E(this,t,e,r);case"base64":return A(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},u.prototype.slice=function(t,e){var r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var n=this.subarray(t,e);return Object.setPrototypeOf(n,u.prototype),n},u.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||U(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},u.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||U(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},u.prototype.readUInt8=function(t,e){return t>>>=0,e||U(t,1,this.length),this[t]},u.prototype.readUInt16LE=function(t,e){return t>>>=0,e||U(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUInt16BE=function(t,e){return t>>>=0,e||U(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUInt32LE=function(t,e){return t>>>=0,e||U(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUInt32BE=function(t,e){return t>>>=0,e||U(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||U(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||U(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},u.prototype.readInt8=function(t,e){return t>>>=0,e||U(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){t>>>=0,e||U(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){t>>>=0,e||U(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return t>>>=0,e||U(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return t>>>=0,e||U(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readFloatLE=function(t,e){return t>>>=0,e||U(t,4,this.length),i.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return t>>>=0,e||U(t,4,this.length),i.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return t>>>=0,e||U(t,8,this.length),i.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return t>>>=0,e||U(t,8,this.length),i.read(this,t,!1,52,8)},u.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||_(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||_(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,1,255,0),this[e]=255&t,e+1},u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,t,e,r,i-1,-i)}var o=0,s=1,u=0;for(this[e]=255&t;++o<r&&(s*=256);)t<0&&0===u&&0!==this[e+o-1]&&(u=1),this[e+o]=(t/s>>0)-u&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);_(this,t,e,r,i-1,-i)}var o=r-1,s=1,u=0;for(this[e+o]=255&t;--o>=0&&(s*=256);)t<0&&0===u&&0!==this[e+o+1]&&(u=1),this[e+o]=(t/s>>0)-u&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeFloatLE=function(t,e,r){return R(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return R(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return k(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return k(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(!u.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i=n-r;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(e,r,n);else if(this===t&&r<e&&e<n)for(var o=i-1;o>=0;--o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,n),e);return i},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var i=t.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(t=i)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var s=u.isBuffer(t)?t:u.from(t,n),f=s.length;if(0===f)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=s[o%f]}return this};var M=/[^+/0-9A-Za-z-_]/g;function j(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function P(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(M,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function q(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function H(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function N(t){return t!=t}var $=function(){for(var t=new Array(256),e=0;e<16;++e)for(var r=16*e,n=0;n<16;++n)t[r+n]="0123456789abcdef"[e]+"0123456789abcdef"[n];return t}()},350:(t,e)=>{e.read=function(t,e,r,n,i){var o,s,u=8*i-n-1,f=(1<<u)-1,a=f>>1,h=-7,c=r?i-1:0,l=r?-1:1,p=t[e+c];for(c+=l,o=p&(1<<-h)-1,p>>=-h,h+=u;h>0;o=256*o+t[e+c],c+=l,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+t[e+c],c+=l,h-=8);if(0===o)o=1-a;else{if(o===f)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,n),o-=a}return(p?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,u,f,a=8*o-i-1,h=(1<<a)-1,c=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,g=n?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-s))<1&&(s--,f*=2),(e+=s+c>=1?l/f:l*Math.pow(2,1-c))*f>=2&&(s++,f/=2),s+c>=h?(u=0,s=h):s+c>=1?(u=(e*f-1)*Math.pow(2,i),s+=c):(u=e*Math.pow(2,c-1)*Math.pow(2,i),s=0));i>=8;t[r+p]=255&u,p+=g,u/=256,i-=8);for(s=s<<i|u,a+=i;a>0;t[r+p]=255&s,p+=g,s/=256,a-=8);t[r+p-g]|=128*y}},143:function(t,e,r){var n;!function(e){"use strict";function i(){}var o=i.prototype,s=e.EventEmitter;function u(t,e){for(var r=t.length;r--;)if(t[r].listener===e)return r;return-1}function f(t){return function(){return this[t].apply(this,arguments)}}o.getListeners=function(t){var e,r,n=this._getEvents();if(t instanceof RegExp)for(r in e={},n)n.hasOwnProperty(r)&&t.test(r)&&(e[r]=n[r]);else e=n[t]||(n[t]=[]);return e},o.flattenListeners=function(t){var e,r=[];for(e=0;e<t.length;e+=1)r.push(t[e].listener);return r},o.getListenersAsObject=function(t){var e,r=this.getListeners(t);return r instanceof Array&&((e={})[t]=r),e||r},o.addListener=function(t,e){if(!function t(e){return"function"==typeof e||e instanceof RegExp||!(!e||"object"!=typeof e)&&t(e.listener)}(e))throw new TypeError("listener must be a function");var r,n=this.getListenersAsObject(t),i="object"==typeof e;for(r in n)n.hasOwnProperty(r)&&-1===u(n[r],e)&&n[r].push(i?e:{listener:e,once:!1});return this},o.on=f("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=f("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,e){var r,n,i=this.getListenersAsObject(t);for(n in i)i.hasOwnProperty(n)&&-1!==(r=u(i[n],e))&&i[n].splice(r,1);return this},o.off=f("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,r){var n,i,o=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=r.length;n--;)o.call(this,e,r[n]);else for(n in e)e.hasOwnProperty(n)&&(i=e[n])&&("function"==typeof i?o.call(this,n,i):s.call(this,n,i));return this},o.removeEvent=function(t){var e,r=typeof t,n=this._getEvents();if("string"===r)delete n[t];else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},o.removeAllListeners=f("removeEvent"),o.emitEvent=function(t,e){var r,n,i,o,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(r=s[o].slice(0),i=0;i<r.length;i++)!0===(n=r[i]).once&&this.removeListener(t,n.listener),n.listener.apply(this,e||[])===this._getOnceReturnValue()&&this.removeListener(t,n.listener);return this},o.trigger=f("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},o._getEvents=function(){return this._events||(this._events={})},i.noConflict=function(){return e.EventEmitter=s,i},void 0===(n=function(){return i}.call(e,r,e,t))||(t.exports=n)}("undefined"!=typeof window?window:this||{})}},e={},function r(n){if(e[n])return e[n].exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(252);var t,e}));