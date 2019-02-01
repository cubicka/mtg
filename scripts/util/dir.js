const fs = require("fs");

function ensureExist(dirPath) {
  console.log("ensureExists", dirPath);
  dirPath.split("/").reduce(function(prev, curr) {
    const next = prev + "/" + curr;
    if (fs.existsSync(next) === false) {
      console.log("create dir for", next, "-");
      fs.mkdirSync(next);
    }
    return next;
  });
}

module.exports = { ensureExist };
