"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (limit) {
  var queue = [];
  var concurrent = 0;

  var next = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var fnc;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(queue.length && concurrent < limit)) {
                _context.next = 8;
                break;
              }

              concurrent += 1;
              fnc = queue.shift();

              next();
              _context.next = 6;
              return fnc();

            case 6:
              concurrent -= 1;
              next();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function next() {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    push: function push(task) {
      var p = new Promise(function (res) {
        var fnc = function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return task();

                  case 2:
                    res();

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          return function fnc() {
            return _ref2.apply(this, arguments);
          };
        }();

        queue.push(fnc);
        next();
      });
      return p;
    }
  };
};