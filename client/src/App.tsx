import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinRoom from "./JoinRoom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JoinRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
