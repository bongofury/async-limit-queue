export default (limit) => {
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
    push: (task) => {
      const p = new Promise((res) => {
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