import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
		<BrowserRouter
			basename={import.meta.env.DEV ? "/" : "/Resolvr_React_Version_/"}
		>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
);
