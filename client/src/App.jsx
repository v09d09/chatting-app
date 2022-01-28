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
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [username, setUsername] = useLocalStorage("username");
  const redirect = username ? "/ch/general" : "/login";
  console.log(username);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={redirect} />} />
        <Route path="/login" element={<Login />} />
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
