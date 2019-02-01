const fs = require("fs");
const { JSDOM } = require("jsdom");

function intoDOM(htmlPath) {
  return new Promise((resolve, reject) => {
    fs.open(htmlPath, "r", function(err, fileToRead) {
      if (!err) {
        fs.readFile(fileToRead, { encoding: "utf-8" }, function(err, data) {
          if (!err) {
            const dom = new JSDOM(data);
            resolve(dom.window.document);
          } else {
            reject(`Error reading the file ${err}`);
          }
        });
      } else {
        reject(`Error opening the file: ${err}`);
      }
    });
  });
}

module.exports = { intoDOM };
