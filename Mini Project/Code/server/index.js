const express = require('express')
const cors =require('cors')
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { spawn } = require('child_process');
const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.json());
app.use(cors());

// const __dirname = "server"
console.log(__dirname)
const pythonScriptPath = path.join(__dirname, 'Python-modules','api.py');
const ppath = path.join(__dirname, 'Python-modules', 'bin', 'python')

// // Define the working directory (one level above the current directory)
// const options = {
//   cwd: path.resolve(__dirname, '..') // Change to the parent directory of the current directory
// };




app.get('/', (req, res)=>{
    res.send("the infamous / route.. ");
})

app.get('/schemes', (req, res) => {
    fs.readFile('./Datasets/.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  
  const workingDirectory = __dirname;

app.post('/', async (req, res) => {
  const inputData = req.body;
  console.log("from backend "+ inputData)
  const scriptArgs = [pythonScriptPath, JSON.stringify(inputData)];
  const pythonProcess = spawn(ppath, scriptArgs, { cwd: workingDirectory });

  let scriptOutput = '';
  
  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('error', (error) => {
    console.error('Error in Python script:', error);
    res.status(500).send('Internal error');
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send(scriptOutput);
  });
});



app.listen(PORT, ()=>{
    console.log("Server started at "+ PORT);
})