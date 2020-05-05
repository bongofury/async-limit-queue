"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = limit => {
  const queue = [];
  let concurrent = 0;

  const next = async () => {
    if (queue.length && concurrent < limit) {
      concurrent += 1;
      const fnc = queue.shift();
      next();
      await fnc();
      concurrent -= 1;
      next();
    }
  };

  return {
    push: task => {
      const p = new Promise(res => {
        const fnc = async () => {
          await task();
          res();
        };

        queue.push(fnc);
        next();
      });
      return p;
    }
  };
};

exports.default = _default;