// file.js - Defines the File and Directory classes
export class File {
  constructor(name, size, content = "") {
      this.name = name;              // File name
      this.size = size;              // Size of the file in KB
      this.content = content;        // Content of the file
  }
}

export class Directory {
  constructor(name) {
      this.name = name;              // Directory name
      this.files = {};               // Store files in a dictionary by name
      this.subdirectories = {};      // Store subdirectories in a dictionary by name
  }
  
  addFile(file) {
      this.files[file.name] = file;
  }
  
  addDirectory(directory) {
      this.subdirectories[directory.name] = directory;
  }
  
  getFile(fileName) {
      return this.files[fileName] || null;
  }
  
  getDirectory(dirName) {
      return this.subdirectories[dirName] || null;
  }
}