"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global Operation, zGET, waitFor */

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
    return new evemitter.Evemitter(host, port, user, pwd);
  },
  Evemitter: /*#__PURE__*/function () {
    function Evemitter(ip, port, user, pwd) {
      _classCallCheck(this, Evemitter);

      this.connection = null;
      this.login = {
        user: user,
        pwd: pwd
      };
      this.port = port;
      this.ip = ip;
      this.generateHost();
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
      }
    }]);

    return Evemitter;
  }()
};

if (window) {
  window.evemitter = evemitter;
}