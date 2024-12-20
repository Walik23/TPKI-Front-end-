const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve(__dirname);

function compileFiles() {
  fs.readdirSync(projectDir).forEach((folder) => {
    const folderPath = path.join(projectDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      fs.readdirSync(folderPath).forEach((file) => {
        const filePath = path.join(folderPath, file);
        if (file.endsWith('.less')) {
          const outputFilePath = filePath.replace(/\.less$/, '.css');
          exec(`lessc ${filePath} ${outputFilePath}`, (err) => {
            if (err) console.error(`Error compiling LESS: ${err}`);
            else console.log(`Compiled LESS: ${filePath} -> ${outputFilePath}`);
          });
        } else if (file.endsWith('.scss')) {
          const outputFilePath = filePath.replace(/\.scss$/, '.css');
          exec(`sass ${filePath} ${outputFilePath}`, (err) => {
            if (err) console.error(`Error compiling SCSS: ${err}`);
            else console.log(`Compiled SCSS: ${filePath} -> ${outputFilePath}`);
          });
        }
      });
    }
  });
}

compileFiles();
