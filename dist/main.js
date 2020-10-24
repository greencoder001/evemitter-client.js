"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global Operation, zGET, waitFor, btoa */

/* Start Load Dependencies */
if (typeof Operation === 'undefined' || typeof waitFor === 'undefined' || typeof zGET === 'undefined') {
  document.write('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/greencoder001/zGET@latest/dist/bundle.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/gh/greencoder001/async.js@latest/dist/bundle.js"></script>');
}

window.addEventListener('DOMContentLoaded', function () {
  if (typeof Operation === 'undefined' || typeof waitFor === 'undefined' || typeof zGET === 'undefined') {
    throw new Error('Dependencies are not avaible! Make sure that you have embedded zGET and async.js!');
  }
});
/* End Load Dependencies */
// Real Script:

var evemitter = {
  connect: function connect() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '127.0.0.1';
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9912;
    var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'evemitter';
    var pwd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var interval = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;
    return new evemitter.Evemitter(host, port, user, pwd, interval);
  },
  Evemitter: /*#__PURE__*/function () {
    function Evemitter(ip, port, user, pwd) {
      var interval = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;

      _classCallCheck(this, Evemitter);

      this.interval = interval;
      this.lastProcessedCall = 0;
      this.connection = null;
      this.login = {
        user: user,
        pwd: pwd
      };
      this.callHandlers = {};
      this.port = port;
      this.ip = ip;
      this.generateHost();
      this.uri = "".concat(this.host).concat(this.login.user, "/").concat(this.login.pwd, "/");
      this.gcS();
    }

    _createClass(Evemitter, [{
      key: "ping",
      value: function ping() {
        var _this = this;

        var request = zGET({
          url: this.host
        });
        request.on('success', function () {
          _this.connection = true;
        });
        request.on('fail', function () {
          _this.connection = false;
        });
      }
    }, {
      key: "generateHost",
      value: function generateHost() {
        this.host = "https://".concat(this.ip, ":").concat(this.port, "/");
      } // Real functions:

    }, {
      key: "call",
      value: function call(id, value) {
        var encrypted = btoa(value);
        return zGET({
          url: "".concat(this.uri, "call/").concat(id, "/").concat(encrypted)
        });
      }
    }, {
      key: "getCalls",
      value: function getCalls(cid, callBack) {
        if (typeof callBack !== 'function') throw new TypeError('callBack must be a function'); // Is CallBack valid?

        cid = "".concat(cid);
        var callsRequest = zGET({
          url: this.uri + 'calls'
        });
        waitFor(callsRequest, function (value) {
          var calls = JSON.parse(value);

          var _iterator = _createForOfIteratorHelper(calls),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _step.value,
                  callID = _step$value.callID,
                  timeStamp = _step$value.timeStamp,
                  owner = _step$value.owner,
                  callMsg = _step$value.callMsg;

              if (cid === callID || cid === '*') {
                callBack({
                  timestamp: timeStamp,
                  owner: owner,
                  id: callID,
                  msg: callMsg
                });
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      }
    }, {
      key: "gcS",
      value: function gcS() {
        var p = this;

        function gCalls() {
          for (var _i = 0, _Object$entries = Object.entries(p.callHandlers); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                values = _Object$entries$_i[1];

            var _iterator2 = _createForOfIteratorHelper(values),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var callHandler = _step2.value;
                p.getCalls(key, callHandler);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }

        setInterval(gCalls, this.interval);
      }
    }, {
      key: "onCall",
      value: function onCall() {
        var callID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
        var callBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.log;
        if (typeof callBack !== 'function') throw new TypeError('callBack must be a function'); // Is CallBack valid?

        callID = "".concat(callID);
        this.callHandlers[callID] = _typeof(this.callHandlers[callID]) !== 'object'
        /* array */
        ? [] : this.callHandlers[callID];
        this.callHandlers[callID].push(callBack);
      }
    }]);

    return Evemitter;
  }()
};

if (window) {
  window.evemitter = evemitter;
}