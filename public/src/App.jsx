import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import { Provider } from "react-redux";
import store from "./store/store";
import { fetchChatUsers } from "./store/UserSlice";
const currentUser = store.getState().user.currentUser;
currentUser && store.dispatch(fetchChatUsers(currentUser._id));
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
