const fs = require("fs");
const { exec } = require("child_process");

function fetchHtml(url, htmlPath, logPath) {
  console.log("start fetching html for", url);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(htmlPath)) {
      resolve(htmlPath);
      return;
    }

    const ls = exec(`wget ${url} -O ${htmlPath} -o ${logPath}`);

    ls.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
      reject(data);
    });

    ls.on("close", code => {
      console.log(`child process exited with code ${code}`);
      resolve(htmlPath);
    });
  });
}

module.exports = fetchHtml;
