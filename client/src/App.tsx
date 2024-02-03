import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import LiveStream from "./LiveStreame";
import ChatRoom from "./ChatRoom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
