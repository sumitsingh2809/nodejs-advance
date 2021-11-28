// process.env.UV_THREADPOOL_SIZE = 1;

const fs = require("fs");
const http = require("http");
const https = require("https");
const crypto = require("crypto");

const start = Date.now();

function doRequest() {
  http
    .request("http://localhost:3000/", (res) => {
      res.on("data", (data) => {});
      res.on("end", () => {
        console.log("Http Request:", Date.now() - start);
      });
    })
    .end();
  //   https
  //     .request("https://www.google.com", (res) => {
  //       res.on("data", (data) => {});
  //       res.on("end", () => {
  //         console.log("Https Request:", Date.now() - start);
  //       });
  //     })
  //     .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

function doReadFile() {
  fs.readFile("multiTask.js", "utf8", (err) => {
    console.log("FS:", Date.now() - start);
  });
}

/**
 * FS: 13
 * Http Request: 19
 */
// doRequest();
// doReadFile();

/**
 * ! By Default
 * Http Request: 19
 * Hash: 739
 * FS: 740
 * Hash: 740
 * Hash: 749
 * Hash: 750
 *
 * ! process.env.UV_THREADPOOL_SIZE = 5;
 * FS: 10
 * Http Request: 18
 * Hash: 769
 * Hash: 769
 * Hash: 773
 * Hash: 783
 *
 * ! process.env.UV_THREADPOOL_SIZE = 1;
 * Http Request: 14
 * Hash: 536
 * Hash: 1089
 * Hash: 1635
 * Hash: 2176
 * FS: 2177
 */
doRequest();
doReadFile();
doHash();
doHash();
doHash();
doHash();

/**
 * Hash: 737
 * Hash: 744
 * FS: 745
 * Hash: 747
 * Hash: 753
 * Hash: 1308
 */
// doRequest();
// doReadFile();
// doHash();
// doHash();
// doHash();
// doHash();
// doHash();
