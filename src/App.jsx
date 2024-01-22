import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { InfoContextProvider } from "./context";

const tele = window.Telegram.WebApp;

function App() {
  useEffect(() => tele.ready(), []);

  return (
    <InfoContextProvider>
      <RouterProvider router={router} />
    </InfoContextProvider>
  );
}

export default App;
