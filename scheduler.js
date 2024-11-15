// process.js - Defines the Process class
export class Process {
  constructor(id, burstTime, arrivalTime) {
      this.id = id;                    // Unique process ID
      this.burstTime = burstTime;       // Total CPU time required
      this.arrivalTime = arrivalTime;   // Time process enters the queue
      this.remainingTime = burstTime;   // Time left for completion
      this.completionTime = 0;          // Time when process completes
      this.waitingTime = 0;             // Total wait time
  }
}

// scheduler.js - Defines the Scheduler class
export class Scheduler {
  constructor() {
      this.processQueue = [];
  }

  addProcess(process) {
      this.processQueue.push(process);
  }

  fcfsScheduling() {
      let currentTime = 0;
      let totalWaitTime = 0;

      console.log("\nExecuting FCFS Scheduling:");
      this.processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);

      for (let process of this.processQueue) {
          if (currentTime < process.arrivalTime) {
              currentTime = process.arrivalTime;
          }
          process.waitingTime = currentTime - process.arrivalTime;
          currentTime += process.burstTime;
          process.completionTime = currentTime;
          totalWaitTime += process.waitingTime;

          console.log(`Process ${process.id} completed at ${process.completionTime} with waiting time ${process.waitingTime}`);
      }

      console.log(`\nAverage Waiting Time for FCFS: ${(totalWaitTime / this.processQueue.length).toFixed(2)}`);
  }

  roundRobinScheduling(timeQuantum) {
      let currentTime = 0;
      let totalWaitTime = 0;
      const queue = [...this.processQueue];

      console.log("\nExecuting Round-Robin Scheduling:");
      while (queue.length > 0) {
          let process = queue.shift();

          if (currentTime < process.arrivalTime) {
              currentTime = process.arrivalTime;
          }

          let execTime = Math.min(timeQuantum, process.remainingTime);
          currentTime += execTime;
          process.remainingTime -= execTime;

          if (process.remainingTime === 0) {
              process.completionTime = currentTime;
              process.waitingTime = process.completionTime - process.burstTime - process.arrivalTime;
              totalWaitTime += process.waitingTime;

              console.log(`Process ${process.id} completed at ${process.completionTime} with waiting time ${process.waitingTime}`);
          } else {
              queue.push(process);  // Re-queue the process if not complete
          }
      }

      console.log(`\nAverage Waiting Time for Round-Robin: ${(totalWaitTime / this.processQueue.length).toFixed(2)}`);
  }
}




