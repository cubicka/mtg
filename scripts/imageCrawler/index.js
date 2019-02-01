const path = require("path");

const htmlFetch = require("../util/htmlFetch");
const htmlParse = require("../util/htmlParse");
const dirUtil = require("../util/dir");
const promiseUtil = require("../util/promise");

const imgDom = require("./dom");

const SET_NAME = process.argv[2];
const baseDirPath = path.join(__dirname, "..", "..", "resources", SET_NAME);
const imgDirPath = path.join(baseDirPath, "images");
const htmlPath = baseDirPath + "/index.html";
const logPath = baseDirPath + "/wget.log";

const url = `https://scryfall.com/sets/${SET_NAME}?order=set`;

dirUtil.ensureExist(baseDirPath);
dirUtil.ensureExist(imgDirPath);

htmlFetch(url, htmlPath, logPath)
  .then(htmlParse.intoDOM)
  .then(imgDom.getAllUrls)
  .then(urls => {
    const cardNames = Object.keys(urls);
    return promiseUtil.map(cardNames, name => {
      const imgName = `${imgDirPath}/\"${name}\".png`;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(htmlFetch(urls[name], imgName, logPath));
        }, 100);
      });
    });
  });
