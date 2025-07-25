import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthStore } from "./store/Authstore";

function App() {

  const isAuthenticated = useAuthStore((state)=> state.isAuthenticated);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated?<Dashboard />:<Login/>} />
          <Route path="/dashboard" element={isAuthenticated?<Dashboard />:<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
