import Upload from "./views/Upload";
import Search from "./views/Search";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
