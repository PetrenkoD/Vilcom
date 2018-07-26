// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({52:[function(require,module,exports) {
// import $ from 'jquery';

// function clearVal(val,limit) {
//   var newVal = val.replace(/[^\d]+/g, '');
//     return newVal.substring(0, limit);
// };

// function getMask(newVal) {
//   var res = '';
//   for (var i = 0; i < newVal.length; i++) {
//    if (i == 0) {
//       res += ' '+'(';
//       res += newVal.charAt(i);
//     } else if (i == 3) {
//       res += ')' + ' ';
//       res += newVal.charAt(i);
//     } else if (i == 6 || i == 8 ) {
//       res += '-';
//       res += newVal.charAt(i);
//     } else {
//       res += newVal.charAt(i);
//     }
//   }
//   return res;
// };

// $(function(){
//   $('#phone').on('input', function(){
//     var val = $(this).val(),
//         limit = 10;
//     var newVal = clearVal(val, limit);
//     var res = getMask(newVal);
//     $(this).val(res);

//     if (newVal.length == limit) {
//       document.getElementById('button').disabled = false;
//     } else {
//       document.getElementById('button').disabled = true;
//     }
//   }); 
//   // document.getElementById('phone').addEventListener('keyup', e => {
//   //   console.log('Caret at: ', e.target.selectionStart)
//   // })
// });


// W O R K  C O D E

(function ($) {

    // узнать позицию курсора
    $.fn.getCursorPosition = function () {
        var input = this.get(0);
        if (!input) return;
        if ('selectionStart' in input) {
            return input.selectionStart;
        } else if (document.selection) {
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    };
    // установить позицию курсора
    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    // удалить выделенный текст
    $.fn.delSelected = function () {
        var input = $(this);
        var value = input.val();
        var start = input[0].selectionStart;
        var end = input[0].selectionEnd;
        input.val(value.substr(0, start) + value.substring(end, value.length));
        return end - start;
    };

    $.fn.phoneFormat = function () {

        function phoneFormatted(element) {
            var newVal = String(element).replace(/[^\d]/g, '');
            var newVall = newVal.substring(0, 10);
            if (!element) return '';
            var res = '';
            for (var i = 0; i < newVall.length; i++) {
                if (i == 0) {
                    res += ' ' + '(';
                    res += newVall.charAt(i);
                } else if (i == 3) {
                    res += ')' + ' ';
                    res += newVall.charAt(i);
                } else if (i == 6 || i == 8) {
                    res += '-';
                    res += newVall.charAt(i);
                } else {
                    res += newVall.charAt(i);
                }
            }
            return res;
        }

        $(this).keydown(function (event) {
            var cursor = $(this).getCursorPosition();
            var code = event.keyCode;
            var startValue = $(this).val();

            if (event.ctrlKey === true && code == 86 || // Ctrl+V | Shift+insert
            event.metaKey === true && code == 86 || event.shiftKey === true && code == 45) {
                return false;
            } else if (code == 9 || // tab
            code == 27 || // ecs
            event.ctrlKey === true || // все что вместе с ctrl
            event.metaKey === true || event.altKey === true || // все что вместе с alt
            event.shiftKey === true || // все что вместе с shift
            code >= 112 && code <= 123 || // F1 - F12
            code >= 35 && code <= 39) // end, home, стрелки
                {
                    return;
                } else if (code == 8) {
                // backspace

                var delCount = $(this).delSelected();
                if (!delCount) {
                    if (startValue[cursor - 1] === ' ') {
                        cursor--;
                    }
                    $(this).val(startValue.substr(0, cursor - 1) + startValue.substring(cursor, startValue.length));
                }
                $(this).val(phoneFormatted($(this).val()));
                $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));

                if (cursor == 14 || cursor == 11 || cursor == 6) {
                    $(this).setCursorPosition(cursor - 1 - (startValue.length - $(this).val().length - delCount));
                }
            } else if (code == 46) {
                // delete

                var delCount = $(this).delSelected();
                if (!delCount) {
                    if (startValue[cursor] === ' ') {
                        cursor++;
                    }
                    $(this).val(startValue.substr(0, cursor) + startValue.substring(cursor + 1, startValue.length));
                }
                if (!delCount) delCount = 1;
                $(this).val(phoneFormatted($(this).val()));
                $(this).setCursorPosition(cursor - (startValue.length - $(this).val().length - delCount));
            } else {
                $(this).delSelected();
                startValue = $(this).val();
                var key = false;
                // цифровые клавиши
                if (code >= 48 && code <= 57) {
                    key = code - 48;
                }
                // numpad
                else if (code >= 96 && code <= 105) {
                        key = code - 96;
                    } else {
                        $(this).val(phoneFormatted($(this).val()));
                        $(this).setCursorPosition(cursor);
                        return false;
                    }
                var length = startValue.length;
                var value = startValue.substr(0, cursor) + key + startValue.substring(cursor, startValue.length);
                $(this).val(phoneFormatted(value));
                $(this).setCursorPosition(cursor + 1 + $(this).val().length - startValue.length);
            }
            event.preventDefault();
        });
    };
})(jQuery);

$(document).ready(function () {
    $('#phone').phoneFormat();
});
},{}],8:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50882' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[8,52], null)
//# sourceMappingURL=/script.272743da.map