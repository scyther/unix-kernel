import { Directory, File } from "./file.js";

export class FileSystem {
  constructor(totalStorage) {
    this.root = new Directory("root");
    this.currentDir = this.root;
    this.totalStorage = totalStorage; // Total storage in KB
    this.usedStorage = 0; // Used storage in KB
  }

  // Helper function to calculate free storage
  get freeStorage() {
    return this.totalStorage - this.usedStorage;
  }

  // Create a new file
  createFile(name, size, content = "") {
    if (size > this.freeStorage) {
      console.log(`Not enough storage to create file: ${name}`);
      return false;
    }

    const newFile = new File(name, size, content);
    this.currentDir.addFile(newFile);
    this.usedStorage += size;

    console.log(
      `File '${name}' created in directory '${this.currentDir.name}'`
    );
    return true;
  }

  // Read a file's content
  readFile(name) {
    const file = this.currentDir.getFile(name);
    if (file) {
      console.log(`Reading file '${name}': ${file.content}`);
      return file.content;
    } else {
      console.log(`File '${name}' not found`);
      return null;
    }
  }

  // Write content to a file
  writeFile(name, newContent) {
    const file = this.currentDir.getFile(name);
    if (file) {
      file.content = newContent;
      console.log(`File '${name}' updated`);
    } else {
      console.log(`File '${name}' not found`);
    }
  }

  // Delete a file
  deleteFile(name) {
    const file = this.currentDir.getFile(name);
    if (file) {
      this.usedStorage -= file.size;
      delete this.currentDir.files[name];
      console.log(`File '${name}' deleted`);
    } else {
      console.log(`File '${name}' not found`);
    }
  }

  // Create a new directory
  createDirectory(name) {
    const newDirectory = new Directory(name);
    this.currentDir.addDirectory(newDirectory);
    console.log(`Directory '${name}' created`);
  }

  // Change directory
  changeDirectory(dirName) {
    if (dirName === "..") {
      if (this.currentDir !== this.root) {
        this.currentDir = this.currentDir.parent;
        console.log(`Moved to parent directory`);
      } else {
        console.log(`Already in root directory`);
      }
    } else {
      const newDir = this.currentDir.getDirectory(dirName);
      if (newDir) {
        newDir.parent = this.currentDir; // Keep track of parent for '..'
        this.currentDir = newDir;
        console.log(`Changed directory to '${dirName}'`);
      } else {
        console.log(`Directory '${dirName}' not found`);
      }
    }
  }

  // List files and directories in the current directory
  listContents() {
    console.log(`Contents of directory '${this.currentDir.name}':`);
    for (const fileName in this.currentDir.files) {
      console.log(`File - ${fileName}`);
    }
    for (const dirName in this.currentDir.subdirectories) {
      console.log(`Directory - ${dirName}`);
    }
  }
}
