import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { prev_commit } from "./version";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container as any);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onUpdate: (e) => {
    const { waiting: { postMessage = null } = {} as any, update } = e || {};
    if (postMessage) {
      postMessage({ type: "SKIP_WAITING" });
    }
    update().then(() => {
      window.location.reload();
    });
  },
});

// eslint-disable-next-line no-console
console.log(`App version: ${prev_commit}`);
