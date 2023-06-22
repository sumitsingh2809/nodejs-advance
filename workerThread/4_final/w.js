const { workerData, parentPort } = require('worker_threads');

function fibonacci(n) {
    return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

// Access the shared buffer
const buffer = new Uint8Array(workerData.sharedBuffer);

const result = fibonacci(buffer[0]);
buffer[0] = result;

parentPort.postMessage('done');
