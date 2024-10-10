/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
import react from "@vitejs/plugin-react";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "sgautomation.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);
console.log(`certFilePath: ${certFilePath}`);
console.log(`keyFilePath: ${keyFilePath}`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  try {
    const makeCert = child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" },
    ).status;
    if (0 !== makeCert) {
      throw new Error("Could not create certificate.");
    }
  } catch (e) {
    console.error(e);
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "https://localhost:7130";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    plugins: () => [react()],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/weatherforecast": {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
