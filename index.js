import { FileSystem } from "./filesystem.js";
import { Scheduler, Process } from "./scheduler.js";

const scheduler = new Scheduler();
scheduler.addProcess(new Process(1, 5, 0)); // ID, Burst Time, Arrival Time
scheduler.addProcess(new Process(2, 3, 1));
scheduler.addProcess(new Process(3, 8, 2));
scheduler.addProcess(new Process(4, 6, 3));

console.log("Processes Scheduling:");
// Run FCFS Scheduling
scheduler.fcfsScheduling();

// Run Round-Robin Scheduling with a time quantum of 2
scheduler.roundRobinScheduling(2);


console.log("\n\nFile System Operations:\n");

const fs = new FileSystem(1024); // Initialize FileSystem with 1024 KB total storage

// Basic file operations
fs.createFile("file1.txt", 100, "Hello World"); // Create a file
fs.readFile("file1.txt");                       // Read file content
fs.writeFile("file1.txt", "Updated Content");   // Update file content
fs.readFile("file1.txt");                       // Read updated content
fs.deleteFile("file1.txt");                     // Delete the file

// Directory operations
fs.createDirectory("dir1");                     // Create a new directory
fs.changeDirectory("dir1");                     // Change to dir1
fs.createFile("file2.txt", 200, "Inside dir1"); // Create a file in dir1
fs.listContents();                              // List contents of dir1
fs.changeDirectory("..");                       // Move back to root
fs.listContents();                              // List contents of root