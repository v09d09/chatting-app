import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Error from "./pages/Error";
import ChatBox from "./components/ChatBox";
import { SocketProvider } from "./context/SocketProvider";
import { useAuth } from "./context/authProvider";
function App() {
  const [user] = useAuth();
  if (!user) return <div>Loading...</div>; // make a spinny thing here
  const redirect = user.uid ? "/ch/general" : "/login";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={redirect} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/ch"
          element={
            <SocketProvider>
              <Main />
            </SocketProvider>
          }
        >
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
