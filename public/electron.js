const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const express = require("express");
const { PythonShell } = require("python-shell");
const expressApp = express();
const spawn = require("child_process").spawn;

const pythonProcess = spawn("python", ["./hello.py"]);

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

pythonProcess.stdout.on("data", (data) => {
  console.log(data.toString());
});

expressApp.get("/", (req, res, next) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: ["shubhamk314"], //An argument which can be accessed in the script using sys.argv[1]
  };

  // res.send("Test");
});

//Creates the server on default port 8000 and can be accessed through localhost:8000
const port = 8000;
expressApp.listen(port, () => console.log(`Server connected to ${port}`));
