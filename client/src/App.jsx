import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FrontPage from "./pages/FrontPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Error from "./pages/Error";
import ChatBox from "./components/ChatBox";
// import { SocketProvider } from "./context/SocketProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ch" element={<Main />}>
          <Route path="general" element={<ChatBox ch="general" />} />
          <Route path="gaming" element={<ChatBox ch="gaming" />} />
          <Route path="cats" element={<ChatBox ch="cats" />} />
          <Route path="dev" element={<ChatBox ch="dev" />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
