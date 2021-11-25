// Start: node event-loop.js

// myFile.runContents(): First node takes the content of myfile.js and executes it

// New timers, tasks, operations are recorded from myfile running
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?

  // Check two: Any pending OS tasks? (Like server listening to port)

  // Check Three: Any pending long running operations? (Like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Now we are inside the event loop
// Every single time the event loop runs inside our app, that is called a 'tick'

while(shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called. setTimeout, setInterval

  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevants callbacks (this is 99% of our code)

  // 3) Pause execution. Continue whenever...
  // - a new pendingOSTask is done
  // - a new pendingOperation is done
  // - a timer is about to complete

  // 4) Look at pendingTimers. Call any setImmediate

  // 5) Handle any 'close' events
  // Example: readSteam
  // readSteam.on('close', () => { console.log("clean up") })

}

// End: exit back to terminal
