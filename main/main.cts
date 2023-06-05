import { BrowserWindow, app } from "electron";

let mainWindow: BrowserWindow | null = null;

console.log(__dirname);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.cjs",
    },
  });

  console.log(__dirname);

  const appUrl = app.isPackaged
    ? `file://${__dirname}/index.html`
    : "http://localhost:5173";

  mainWindow.loadURL(appUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
