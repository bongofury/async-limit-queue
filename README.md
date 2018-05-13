# async-limit-queue
A little helper to create a queue of async function with limited concurrency.

## Description
I use this module when I have a bunch async function to be executed and want the number of concurrently executed function to be controlled.

This module exports a function that creates an instance of queue with the given concurrency limit.

Use the `push` method to add (one by one) async functions to the queue. This method returns a `Promise` that is resolved when the passed async function is executed.

Items in the queue are processed _FIFO_.

## Usage

First import the module and create a queue...

```javascript
import createQueue from 'async-limit-queue';

// this creates a queue with concurrency limit = 7
const queue = createQueue(7);
```

... then push functions inside the queue and do something after their execution, if you want.

```javascript
const foo = async () => {/* ... */};
const bar = async () => {/* ... */};

queue.push(foo).then(
  () => console.log('Function "foo" done!')
);

queue.push(bar).then(
  () => console.log('Function "bar" done!')
);
```
