const { Worker } = require('worker_threads');

const doFib = async (iterations) => {
    return new Promise((resolve, reject) => {
        const start = Date.now();

        // Create a shared buffer
        const sharedBuffer = new SharedArrayBuffer(1);
        const buffer = new Uint8Array(sharedBuffer);
        buffer.fill(iterations);

        // create a worker and pass the shared buffer to it
        const worker = new Worker('./w.js', {
            workerData: { sharedBuffer },
        });

        // ---- Listen for message from worker
        worker.once('message', () => {
            console.log(`worker [${worker.threadId}]: done in ${Date.now() - start} ms`);
            resolve(buffer);
        });

        // ---- Listen for error from worker
        worker.once('error', (err) => reject(err));
    });
};

const main = async () => {
    const start = Date.now();

    const values = await Promise.all([
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
        doFib(40),
    ]);

    // console.log('values:', values);
    console.log(`fib done in: ${Date.now() - start} ms`);
};
main().catch(console.error);
