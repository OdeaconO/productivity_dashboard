const { app, BrowserWindow } = require("electron");
const path = require("path");

// Simple check for development mode
const isDev =
  process.env.NODE_ENV === "development" ||
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

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
