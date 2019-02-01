function wrapInPromise(fn) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fn());
    } catch (e) {
      reject(e);
    }
  });
}

function reduce(promises) {
  function recursiveResolve(promisesLeft, accum) {
    if (promisesLeft.length === 0) return Promise.resolve(accum);
    return wrapInPromise(() => promisesLeft[0]).then(result => {
      return recursiveResolve(promisesLeft.slice(1), accum.concat([result]));
    });
  }

  return recursiveResolve(promises, []);
}

function map(colls, fn) {
  function recursiveResolve(idx, accum) {
    if (colls.length === idx) return Promise.resolve(accum);
    return wrapInPromise(() => fn(colls[idx])).then(result => {
      return recursiveResolve(idx + 1, accum.concat([result]));
    });
  }

  return recursiveResolve(0, []);
}

module.exports = { map, reduce };
