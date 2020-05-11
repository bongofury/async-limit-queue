const test = require('tape');
const exp = require('../dist');

test('Exports default', (t) => {
  t.plan(2);
  const createQueue = exp.default;
  t.ok(createQueue, 'default export is defined');
  t.equal(typeof createQueue, 'function', 'default export is a function');
});

test('Limited concurrency', (t) => {
  t.plan(2);
  const createQueue = exp.default;
  const queue = createQueue(3);
  const count = [0];
  for (let i = 0; i < 30; i++) {
    const asyncFnc = () => new Promise((res) => {
      count.push(count[count.length - 1] + 1);
      setTimeout(() => {
        count.push(count[count.length - 1] - 1);
        res();
      }, 10);
    });
    queue.push(asyncFnc);
  }

  setTimeout(() => {
    t.true(count.every(c => c <= 3), 'concurrency limit is respected');
    t.equal(Math.max(...count), 3, 'queue is correctly full');
  }, 500)
});