!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r,o="object"==typeof Reflect?Reflect:null,i=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var c=10;function u(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function l(e,t,n,r){var o,i,s,a;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=u(e))>0&&s.length>o&&!s.warned){s.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=s.length,a=c,console&&console.warn&&console.warn(a)}return e}function f(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,i(this.listener,this.target,e))}.bind(r);return o.listener=n,r.wrapFn=o,o}function d(e,t,n){var r=e._events;if(void 0===r)return[];var o=r[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):m(o,o.length)}function p(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function m(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return u(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var c=o[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var u=c.length,l=m(c,u);for(n=0;n<u;++n)i(l[n],this,t)}return!0},a.prototype.addListener=function(e,t){return l(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return l(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,f(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,f(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,r,o,i,s;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},a.prototype.listeners=function(e){return d(this,e,!0)},a.prototype.rawListeners=function(e){return d(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},a.prototype.listenerCount=p,a.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(e,t,n){"use strict";n.r(t),n.d(t,"html",function(){return s}),n.d(t,"script",function(){return a});var r=n(0);function o(e){const t=new r.EventEmitter,n=e=>{e&&e.event&&t.emit(e.event,e.data)};return e?window.onmessage=e=>n(e.data.pluginMessage):figma.ui.onmessage=e=>n(e),t.send=function(t,n){if("string"!=typeof t)throw new Error("Expected first argument to be an event name string");const r={event:t,data:n};e?window.parent.postMessage({pluginMessage:r},"*"):figma.ui.postMessage(r)},t.async=function(e){return new Promise(t=>{this.once(e,t)})},t}const i="undefined"==typeof figma,s=i?o(!0):void 0,a=i?void 0:o()},function(e,t,n){"use strict";t.__esModule=!0,n(3);var r=n(1);document.getElementById("arabic").onchange=function(e){var t=e.target.checked?"block":"none";document.getElementById("isolates").parentNode.style.display=t,document.getElementById("ligatures").parentNode.style.display=t,document.getElementById("space-hack").parentNode.style.display=t};var o=function(){var e,t,n,o,i=document.getElementById("text").value;r.html.send("fix-text",{text:i,options:(e=document.getElementById("arabic").checked,t=document.getElementById("isolates").checked,n=document.getElementById("ligatures").checked,o=document.getElementById("space-hack").checked,e?{arabic:e,isolates:t,ligatures:n,spaceHack:o}:{arabic:e,isolates:!1,ligatures:!1,spaceHack:!1})})};document.getElementById("help").onclick=function(){document.getElementById("about").style.display="flex",document.getElementById("plugin").style.display="none"},document.getElementById("back").onclick=function(){document.getElementById("about").style.display="none",document.getElementById("plugin").style.display="flex"},document.getElementById("fix").addEventListener("click",o),document.getElementById("arabic").addEventListener("change",o),document.getElementById("isolates").addEventListener("change",o),document.getElementById("ligatures").addEventListener("change",o),document.getElementById("space-hack").addEventListener("change",o),document.getElementById("text").addEventListener("input",o),r.html.on("selection",function(e){document.getElementById("multi-selection").style.display="none",document.getElementById("no-selection").style.display="none",document.getElementById("controls").style.display="flex",document.getElementById("text").value=e.text,document.getElementById("arabic").checked=e.options.arabic,document.getElementById("isolates").checked=e.options.isolates,document.getElementById("ligatures").checked=e.options.ligatures,document.getElementById("space-hack").checked=e.options.spaceHack}),r.html.on("no-selection",function(){document.getElementById("no-selection").style.display="flex",document.getElementById("multi-selection").style.display="none",document.getElementById("controls").style.display="none"}),r.html.on("multi-selection",function(){document.getElementById("multi-selection").style.display="flex",document.getElementById("no-selection").style.display="none",document.getElementById("controls").style.display="none"})},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(6)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(5)(!1)).push([e.i,'body {\n  padding: 16px;\n  font: normal 400 11px/16px Inter, Roboto, sans-serif;\n}\n\nmain>div {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-items: stretch;\n  justify-content: flex-start;\n}\n\n.error {\n  align-items: center;\n  justify-content: center;\n  color: #999;\n  height: 100%;\n  font-size: 16px;\n}\n\ninput[type="checkbox"]:after {\n  content: \'\';\n  display: inline-flex;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, .8);\n  border-radius: 2px;\n  box-sizing: border-box;\n  background-color: #fff;\n}\n\ninput[type="checkbox"]:checked:after {\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMS4xNzY0NyAyLjgyMzc3TDMuMDU4ODIgNC43MDYxM0w2LjgyMzUzIDAuOTQxNDA2TDggMi4xMTc4OEwzLjA1ODgyIDcuMDU5MDhMMCA0LjAwMDI0TDEuMTc2NDcgMi44MjM3N1oiIGZpbGw9IndoaXRlIi8+PC9zdmc+);\n  border: 1px solid #18a0fb;\n  background-color: #18a0fb;\n  background-position: 50%;\n  background-repeat: no-repeat;\n}\n\n#options {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  margin: 0 0 37px;\n  padding: 0;\n}\n\ntextarea {\n  height: calc(100vh - 150px);\n  color: #333;\n  border: 1px solid #e5e5e5;\n  padding: 8px;\n  resize: none;\n  margin-bottom: 16px;\n  direction: rtl;\n  font-size: 14px;\n  font-family: monospace;\n}\n\nfooter {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\nbutton {\n  border-radius: 5px;\n  background: white;\n  color: black;\n  border: none;\n  padding: 8px 15px;\n  margin: 0 0 0 16px;\n  box-shadow: inset 0 0 0 1px black;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nbutton svg,\na svg {\n  margin-right: 4px;\n}\n\na {\n  color: #18A0FB;\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  text-decoration: none;\n}\n\n.primary {\n  box-shadow: none;\n  background: #18A0FB;\n  color: white;\n}\n\ninput {\n  border: none;\n  outline: none;\n  padding: 8px;\n}\n\ninput:hover {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);\n}\n\nbutton:focus {\n  box-shadow: inset 0 0 0 2px #18A0FB;\n}\n\n.primary:focus {\n  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);\n}\n\ninput:focus {\n  box-shadow: inset 0 0 0 2px #18A0FB;\n}\n\nbutton:last-child {\n  margin-left: 16px;\n}\n\n#about {\n  display: none;\n  margin-bottom: 72px;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n#about footer {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 24px;\n  background: #fff;\n  box-shadow: 0 -3px 20px rgba(0, 0, 0, 0.1);\n}\n\nh2 {\n  font-size: 12px;\n  font-weight: bold;\n  text-transform: uppercase;\n  margin: 0;\n}\n\nh2+a {\n  margin: 8px 0 16px;\n}\n\nol,\nul {\n  padding-left: 12px;\n  margin: 8px 0;\n}\n\nli {\n  margin-bottom: 8px;\n}',""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),i=r.sources.map(function(e){return"/*# sourceURL=".concat(r.sourceRoot).concat(e," */")});return[n].concat(i).concat([o]).join("\n")}var s,a,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(n,"}"):n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var s=0;s<e.length;s++){var a=e[s];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="(".concat(a[2],") and (").concat(n,")")),t.push(a))}},t}},function(e,t,n){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),a=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),c=null,u=0,l=[],f=n(7);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(g(r.parts[s],t))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(g(r.parts[s],t));i[r.id]={id:r.id,refs:1,parts:a}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],s=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function m(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(e.insertAt.before,n);n.insertBefore(t,o)}}function y(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function h(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return v(t,e.attrs),m(e,t),t}function v(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var s=u++;n=c||(c=h(t)),r=w.bind(null,n,s,!1),o=w.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",v(t,e.attrs),m(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,t),o=function(){y(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){y(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(a=i[s.id]).refs--,r.push(a)}e&&d(p(e,t),t);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete i[a.id]}}}};var b,x=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}}]);