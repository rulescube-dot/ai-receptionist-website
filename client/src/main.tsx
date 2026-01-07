import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { ImpersonationProvider } from "./context/ImpersonationContext";

createRoot(document.getElementById("root")!).render(
    <ImpersonationProvider>
      <App />
    </ImpersonationProvider>
  );
