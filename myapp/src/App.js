import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/products"
          element={<PrivateRoute component={Products} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
