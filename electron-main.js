/* eslint-disable no-undef */
import { app, BrowserWindow, nativeImage } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getIconPath = () =>
  app.isPackaged
    ? path.join(process.resourcesPath, "icons", "icon.png")
    : path.join(__dirname, "build", "icons", "icon.png");

const getIndexHtmlPath = () =>
  app.isPackaged
    ? path.join(process.resourcesPath, "dist", "index.html")
    : path.join(__dirname, "dist", "index.html");

const createWindow = () => {
  const appIcon = nativeImage.createFromPath(getIconPath());
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (process.platform === "darwin") {
    app.dock.setIcon(appIcon);
  }

  const devServerUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(getIndexHtmlPath());
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
