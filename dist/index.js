'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = undefined;

var _objectPathImmutable = require('object-path-immutable');

var _objectPathImmutable2 = _interopRequireDefault(_objectPathImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pipe = exports.pipe = function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (state, props) {
    return fns.reduce(function (s, fn) {
      return fn(s, props);
    }, (0, _objectPathImmutable2.default)(state)).value();
  };
};